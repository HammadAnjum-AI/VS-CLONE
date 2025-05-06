import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EnterOTP() {
  const [formData, setFormData] = useState({ otp: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ otp: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = "OTP must be a 6-digit number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

   
    alert("OTP verified");
    navigate("/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter OTP: </label>
          <input
            name="otp"
            placeholder="Enter the OTP sent to your mobile"
            type="text"
            value={formData.otp}
            onChange={handleChange}
          />
          {errors.otp && <p className="error">{errors.otp}</p>}
        </div>
        <br />

        <button type="button" onClick={() => navigate("/forgot")} style={{ marginRight: '10px' }}>
          Cancel
        </button>

        <button type="submit">Verify & Reset</button>
      </form>
    </div>
  );
}
