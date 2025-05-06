import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDetailsService from './admindetailsservice';


export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        adminname: '',
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
    if (!formData.adminname.trim()) newErrors.adminname = "Admin name is required";
      
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) 
            return;

        AdminDetailsService.validateUser(formData.adminname,formData.password).then((response) => {
            if (response.status === 200) {
                const name = response.data.name;
                alert("WELCOME- " +response.data);
                navigate("/admpage")
              } else {
                alert('TRY AGAIN');
              }
        })
        
        console.log('Form submitted:', formData);
      };



  return(
    <div>
    <form  onSubmit={handleSubmit} >
        <h2>Login to Admin account</h2>
      <div>
        <label className="form-label">Admin Name : </label>
        <input
          id="adminname"
          placeholder="Enter the admin name"
          type="text"
          name="adminname"
          value={formData.adminname}
          onChange={handleChange}
        />
        {errors.adminname && <p className="error">{errors.adminname}</p>}
      </div>

      <div>
        <label className="form-label">Password : </label>
        <input
        
        id='password'
        placeholder="Enter your password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
         {errors.password && <p className="error">{errors.password}</p>}
      </div>

                      <button 
                      type="button" 
                      onClick={() => navigate("/")}>
                        Cancel
                        </button>

                      <button 
                      type="submit">
                        Login
                        </button>
   
</form>
</div>
);
}
  