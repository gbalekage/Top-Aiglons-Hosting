const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} = require("./emailTemplates");
const { client, sender } = require("./mailConfig");

const sendVerificationCode = async (email, code) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{vericationCode}", code),
      category: "Email verifcation",
    });

    console.log("Email sent", response);
  } catch (error) {
    console.log(`Error sending email`, error);
  }
};

const sendForgotEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Forgot Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Forgot Password",
    });

    console.log("Email sent", response);
  } catch (error) {
    console.log(`Error sending email`, error);
  }
};

module.exports = { sendVerificationCode, sendForgotEmail };
