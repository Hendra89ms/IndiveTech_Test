import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { verfifyEmail } from "../../service/authService";
import { Link } from "react-router-dom";
import FormDataDiri from "../formDataDiri/FormDataDiri";

function VerifyEmail() {
  const { token } = useParams();
  const [statusVeriy, setStatusVerify] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await verfifyEmail(token);
        const statusVerified = response.data.isVerification;
        console.log("STATUS: ", statusVerified);
        setStatusVerify(statusVerified);
      } catch (error) {
        console.log("Verification failed. Invalid or expired token.");
      }
    };

    verifyEmail();
  }, [token]);

  if (statusVeriy) {
    return <FormDataDiri />;
  } else {
    return <div>Please Verify Your Email!</div>;
  }
}

export default VerifyEmail;
