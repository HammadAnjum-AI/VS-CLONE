import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDetailsService from './patientdetailservice'; 

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mobilenumber: '',
        password: ''
    });
   
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.mobilenumber || !/^\d{10}$/.test(formData.mobilenumber)) {
            newErrors.mobilenumber = "Valid 10-digit mobile number is required";
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        PatientDetailsService.validateUser(formData.mobilenumber, formData.password)
            .then((response) => {
                if (response.status === 200) {
                    const { name, mobilenumber } = response.data;
                    // Store mobile number in localStorage
                    localStorage.setItem('mobilenumber', mobilenumber);
                    alert(`WELCOME- ${response.data}`);
                    navigate('/dash');  
                } else {
                    alert('Invalid credentials, please try again');
                }
            })
            .catch((err) => {
                console.error('Error logging in:', err);
                alert('Error logging in, please try again later.');
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login to your account</h2>
                <div>
                    <label className="form-label">Mobile Number : </label>
                    <input
                        id="mobilenumber"
                        placeholder="Enter 10-digit number"
                        type="tel"
                        name="mobilenumber"
                        value={formData.mobilenumber}
                        onChange={handleChange}
                    />
                    {errors.mobilenumber && <p className="error">{errors.mobilenumber}</p>}
                </div>

                <div>
                    <label className="form-label">Password : </label>
                    <input
                        id="password"
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <p 
                    style={{ color: 'blue', textDecoration: 'underline' }}
                    onClick={() => navigate("/forgot")}>
                        Forgot password
                </p>

                <button type="button" onClick={() => navigate("/reg")}>Cancel</button>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
