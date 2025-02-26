import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    if (!success || !orderId) {
      console.error("Missing success or orderId in query params");
      navigate("/");
      return;
    }

    try {
      console.log(`Verifying order: ${orderId} with success=${success}`);

      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      console.log("Verification Response:", response.data);

      if (response.data.success) {
        console.log("Payment successful, navigating to /myorders");
        navigate("/myorders");
      } else {
        console.log("Payment failed, navigating to /");
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Payment verification failed:",
        error.response?.data || error.message
      );
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [success, orderId]); // Only runs if success and orderId exist

  return (
    <div className="verify">
      <p>Verifying your payment...</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
