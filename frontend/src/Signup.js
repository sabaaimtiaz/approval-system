
import React, { useState } from "react";
import './signup.css'; 
import user_icon from './Assets/person.png';
import password_icon from './Assets/password.png';
import email_icon from './Assets/email.png';
import role_icon from './Assets/role.png';
import { Link,  useNavigate, useSearchParams } from "react-router-dom"; 
import validation from "./Signupvalidation";
import axios from "axios";
import Menu from "./Menu";
import { message } from "antd";
//import Usermenu from "./Usermenu";



const Signup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
 var m =  searchParams.get("type")
 console.log("mmm", m)
  const [values, setValues] = useState({
    email: '',
    password: '',
    username: '',
    role: 'User' 
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit called");
    const validationErrors = validation(values);
    setErrors(validationErrors);

    console.log("Selected role:", values.role); 

    if (validationErrors.email === "" && validationErrors.password === "" && validationErrors.username === "") {
      try {
        const res = await axios.post('http://localhost:3001/auth/signup', {
          username: values.username,
          email: values.email,
          password: values.password,
          role: values.role
        });
        console.log("Full Server Response:", res);

        if (res.data.user && res.data.user.message === 'Email already exists') {

          console.log('Duplicate email condition triggered'); 
           message.error("Email already exists. Please try a different one.")
          setErrors(prev => ({ ...prev, email: 'Email already exists' }));
        } else if (res.data.message === 'Signup successful')  
        {
          //message.success("Signup successful!");
        if(m == "superadmin"){
          //alert("user added successfully")
          message.success("User added successfully!");
        }
        else{
          message.success("Signup successful!");
          navigate('/login');
        }
        
      }
      } catch (error) {
        console.error('Signup error:', error.response?.data || error.message);
        setErrors(prev => ({ ...prev, server: 'An unexpected error occurred. Please try again.' }));
      }
    }
  };

  return (
    <>
          {
        m == "superadmin" ?

      
      <Menu />
: null}
    <div className='container'>

      {
        m == "superadmin" ?

      
      <div className="header">
        <div className="text">Add User</div>
        <div className="underline"></div>
      </div>
:


<div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

}

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={handleInput}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="dropdown">
          <img className="img" src={role_icon} alt="" />
            {/* <label>Role</label> */}
            <select className="select" name="role" value={values.role} onChange={handleInput}>
              <option value="Superadmin">Superadmin</option>
              <option value="User">User</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>
        </div>
{
  m == "superadmin" ?

  <div className="submit-container">
  <button className="submit">Submit</button>
 
</div>
:

        <div className="submit-container">
          <button className="submit">Sign Up</button>
          <Link to="/login" className="submit">Login</Link>
        </div>
}
      </form>
    </div>
    </>
  );
};

export default Signup;

