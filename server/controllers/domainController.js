const Domain = require("../models/domainModel");
const User = require("../models/userModel");
const { enomUsername, enomApiKey, enomBaseUrl } = require("../config/enom");
const { default: axios } = require("axios");
const domainPrices = require("../utils/domainPrices");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const checkDomain = async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res
        .status(422)
        .json({ message: "Please provide a domain to check." });
    }

    const [sld, tld] = domain.split(".");
    if (!sld || !tld) {
      return res
        .status(422)
        .json({ message: "Invalid domain format. Use 'example.com'." });
    }

    const response = await axios.get(`${enomBaseUrl}/interface.asp`, {
      params: {
        command: "Check",
        uid: enomUsername,
        pw: enomApiKey,
        sld,
        tld,
        responseType: "JSON",
      },
      timeout: 15000,
    });

    const data = response.data["interface-response"];

    console.log(data);

    if (!data) {
      throw new Error("Invalid response from Enom API.");
    }

    const isAvailable = data.RRPCode === "210";
    return res.status(200).json({
      message: isAvailable ? "Domain is available" : "Domain is not available",
      isAvailable,
    });
  } catch (error) {
    const message =
      error.response?.data || error.message || "An error occurred.";
    return res.status(500).json({ message });
  }
};

const registerDomain = async (req, res) => {
  try {
    const { domain } = req.body;
    const userId = req.userId;

    if (!domain) {
      return res
        .status(422)
        .json({ message: "Please provide a domain to register." });
    }

    const [sld, tld] = domain.split(".");
    if (!sld || !tld) {
      return res
        .status(422)
        .json({ message: "Invalid domain format. Use 'example.com'." });
    }

    if (!domainPrices[tld]) {
      return res.status(400).json({ message: "Unsupported domain extension." });
    }

    const price = domainPrices[tld];

    const response = await axios.get(`${enomBaseUrl}/interface.asp`, {
      params: {
        command: "Check",
        uid: enomUsername,
        pw: enomApiKey,
        sld,
        tld,
        responseType: "JSON",
      },
      timeout: 30000,
    });

    if (
      response.data["interface-response"] &&
      response.data["interface-response"].RRPCode !== "210"
    ) {
      return res
        .status(400)
        .json({ message: "Domain is not available for registration." });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Domain Registration: ${domain}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      success_url: `${process.env.CLIENT_URL}dashboard?session_id={CHECKOUT_SESSION_ID}&domain=${domain}`,
      cancel_url: `${process.env.CLIENT_URL}checkout/cancel`,
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message || "Failed to initiate the registration.",
    });
  }
};

const handleSuccess = async (req, res) => {
  try {
    const { session_id, domain } = req.body;
    const userId = req.userId;

    if (!session_id) {
      return res.status(400).json({ message: "session_id is required." });
    }

    if (!domain) {
      return res.status(400).json({ message: "domain is required." });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Log the retrieved session to check its content
    console.log("Stripe Session Retrieved:", session);

    if (!session || session.payment_status !== "paid") {
      return res
        .status(400)
        .json({ message: "Invalid or incomplete payment." });
    }

    const [sld, tld] = domain.split(".");
    const registerResponse = await axios.get(`${enomBaseUrl}/interface.asp`, {
      params: {
        command: "Purchase",
        uid: enomUsername,
        pw: enomApiKey,
        sld,
        tld,
        responseType: "TEXT",
        period: 1,
      },
      responseType: "text",
      timeout: 30000,
    });

    const rawResponse = registerResponse.data;
    const lines = rawResponse.split("\n");
    const parsedResponse = lines.reduce((acc, line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        acc[key.trim()] = value.trim();
      }
      return acc;
    }, {});

    const errorMessage = parsedResponse["RRPText"];
    const rrpCode = parsedResponse["RRPCode"];
    const domainRegistered = parsedResponse["DomainName"];
    const orderId = parsedResponse["OrderID"];

    if (!rrpCode || rrpCode !== "200") {
      return res.status(500).json({
        message: `Error registering the domain: ${
          errorMessage || "Unknown error"
        }`,
      });
    }

    if (!domainRegistered && !orderId) {
      return res.status(500).json({ message: "Domain registration failed." });
    }

    const newDomain = new Domain({
      domain,
      expiryDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
      userId,
    });

    try {
      await newDomain.save();
      await User.findByIdAndUpdate(userId, { $inc: { domainCount: 1 } });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to save domain information." });
    }

    return res.status(201).json({
      message: "Domain registered successfully!",
      domain: newDomain,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to complete the registration.",
    });
  }
};

const handleCancel = (req, res) => {
  return res.status(200).json({
    message: "Payment canceled. No domain registration was made.",
  });
};

module.exports = { checkDomain, registerDomain, handleSuccess, handleCancel };
