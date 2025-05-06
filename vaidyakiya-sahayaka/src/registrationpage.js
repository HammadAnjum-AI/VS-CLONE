import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link  } from "react-router-dom";
import "./color.css";


export default function Register(){
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        dob: "",
        mobilenumber: "",
        email: "",
        address: "",
        bpl: "",
        password: "",
        confirmpassword: "",
        assistantname: "",
        assistantmobilenumber: "",
        assistantaddress: "",
      });


      const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type , name } = e.target;
    const key = id || name;
    setFormData({ ...formData, [key]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || isNaN(formData.age)) newErrors.age = "Valid age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "DOB is required";
    if (!formData.mobilenumber || !/^\d{10}$/.test(formData.mobilenumber))
         {
        newErrors.mobilenumber = "Valid 10-digit mobile number is required";
        }      
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.bpl) newErrors.bpl = "BPL is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.password || formData.password !== formData.confirmpassword) 
        {
        newErrors.confirmpassword = "Password do not match";
        }
    if (!formData.assistantname.trim()) newErrors.assistantname = "Assistant name required";
    if (!formData.assistantmobilenumber.match(/^\d{10}$/)) newErrors.assistantmobilenumber = "Valid 10-digit mobile number is required";
    if (!formData.assistantaddress.trim()) newErrors.assistantaddress = "Assistant address required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (formData.bpl === "No") {
        alert("Registration is allowed only for BPL card holders.");
        return; 
      }
      alert("Registration successful!");
      navigate("/login");
    }
  };
  

    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Patient details</h2>

        <div>
          <label>Name:</label>
          <input 
          id="name" 
          type="text" 
          placeholder="Enter your full name"
          value={formData.name} 
          onChange={handleChange} 
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div><br />

        <div>
          <label>Age:</label>
          <input id="age" 
          type="text" 
          placeholder="Enter your age"
          value={formData.age} 
          onChange={handleChange} />
          {errors.age && <p className="error">{errors.age}</p>}
        </div><br />

        <div>
          <label>Gender:</label>
          <label>
            <input type="radio" 
            name="gender" 
            value="Male" 
            checked={formData.gender === "Male"} 
            onChange={handleChange} 
            />
            Male
          </label>
          <label>
            <input 
            type="radio" 
            name="gender" 
            value="Female" 
            checked={formData.gender === "Female"} 
            onChange={handleChange} 
            />
            Female
          </label>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div><br />

        <div>
          <label>DOB:</label>
          <input 
          type="date" 
          id="dob" 
          value={formData.dob} 
          onChange={handleChange} 
          />
          {errors.dob && <p className="error">{errors.dob}</p>}
        </div><br />

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
        </div><br />

        <div>
          <label>Email:</label>
          <input 
          id="email" 
          type="email" 
          placeholder="Enter your email address"
          value={formData.email} 
          onChange={handleChange} 
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div><br />

        <div>
          <label>Address:</label>
          <input 
          id="address" 
          type="text" 
          placeholder="Enter your home address"
          value={formData.address} 
          onChange={handleChange} 
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div><br />

        <div>
          <label>BPL Card:</label>
          <label>
            <input 
            type="radio" 
            name="bpl" 
            value="Yes" 
            checked={formData.bpl === "Yes"} 
            onChange={handleChange} 
            /> 
            Yes
            </label>

          <label>
            <input 
            type="radio" 
            name="bpl" 
            value="No" 
            checked={formData.bpl === "No"} 
            onChange={handleChange} 
            /> 
            No
            </label>
          {errors.bpl && <p className="error">{errors.bpl}</p>}
        </div><br />

        <div>
          <label>Password:</label>
          <input 
          id="password" 
          type="password" 
          placeholder="Enter your password"
          value={formData.password} 
          onChange={handleChange} 
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div><br />

        <div>
          <label>Confirm Password:</label>
          <input 
          id="confirmpassword" 
          type="password" 
          placeholder="Confirm your password"
          value={formData.confirmpassword} 
          onChange={handleChange} 
          />
          {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}
        </div><br />

        
        <h2>Assistant Details</h2>

        <div>
          <label>Name:</label>
          <input 
          id="assistantname" 
          type="text" 
          placeholder="Enter assistant's name"
          value={formData.assistantname} 
          onChange={handleChange} 
          />
          {errors.assistantname && <p className="error">{errors.assistantname}</p>}
        </div><br />

        <div>
          <label>Mobile number:</label>
          <input 
          id="assistantmobilenumber" 
          type="tel" 
          placeholder="Enter assistant's mobile number"
          value={formData.assistantmobilenumber} 
          onChange={handleChange} 
          />
          {errors.assistantmobilenumber && <p className="error">{errors.assistantmobilenumber}</p>}
        </div><br />

        <div>
          <label>Address:</label>
          <input 
          id="assistantaddress" 
          type="text" 
          placeholder="Enter assistant's home address"
          value={formData.assistantaddress} 
          onChange={handleChange} 
          />
          {errors.assistantaddress && <p className="error">{errors.assistantaddress}</p>}
        </div><br />

        <Link to="/">
          <button type="button">Back</button>
        </Link>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}