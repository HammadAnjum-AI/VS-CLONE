import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    mobilenumber: "",
    newpassword: "",
    confirmnewpassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/^\d{10}$/.test(formData.mobilenumber)) {
      newErrors.mobilenumber = "Enter a valid 10-digit mobile number";
    }

    if (formData.newpassword.length < 6) {
      newErrors.newpassword = "Password must be at least 6 characters";
    }

    if (!formData.newpassword || formData.newpassword !== formData.confirmnewpassword) 
      {
      newErrors.confirmnewpassword = "Passwords do not match";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("OTP sent to your mobile number");
      navigate("/otp");  
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Forgot password</h2>

        <div>
          <label>Mobile number:</label>
          <input
            id="mobilenumber"
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.mobilenumber}
            onChange={handleChange}
          />
          {errors.mobilenumber && <p className="error">{errors.mobilenumber}</p>}
        </div>
        <br />

        <div>
          <label>New password:</label>
          <input
            id="newpassword"
            type="password"
            placeholder="Enter your new password"
            value={formData.newpassword}
            onChange={handleChange}
          />
          {errors.newpassword && <p className="error">{errors.newpassword}</p>}
        </div>
        <br />

        <div>
          <label>Confirm new password:</label>
          <input
            id="confirmnewpassword"
            type="password"
            placeholder="Confirm your new password"
            value={formData.confirmnewpassword}
            onChange={handleChange}
          />
          {errors.confirmnewpassword && <p className="error">{errors.confirmnewpassword}</p>}
        </div>
        <br />

        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}
