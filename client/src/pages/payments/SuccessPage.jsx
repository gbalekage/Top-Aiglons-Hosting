import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handlePaymentSuccess = async () => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");
    const domain = queryParams.get("domain");

    if (!sessionId || !domain) {
      console.error("Invalid or missing parameters: session_id or domain.");
      setMessage("Invalid or missing payment details.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/domain/success",
        { session_id: sessionId, domain },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Payment success response:", response.data);

      setMessage("Payment and domain registration were successful!");
      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard", { state: { successMessage: message } });
      }, 3000);
    } catch (error) {
      console.error(
        "Error in handlePaymentSuccess:",
        error.response?.data || error.message
      );
      setMessage("An error occurred while processing your payment.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePaymentSuccess();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
          <p className="text-lg font-medium">Processing your payment...</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
          <p className="text-xl font-semibold mb-4">{message}</p>
          {!loading && (
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
