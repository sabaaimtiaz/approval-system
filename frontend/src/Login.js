
import React, { useState } from "react";
import './login.css';
import password_icon from './Assets/password.png';
import email_icon from './Assets/email.png';
import { Link, useNavigate } from "react-router-dom"; 
import validation from "./LoginValidation"; 
import axios from "axios"; 

import { message } from "antd";
const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleInput = (event) => {   //object represents the dom event 
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        const response = await axios.post('http://localhost:3001/auth/login', {
          email: values.email,
          password: values.password
        });

        if (response.data.token) {
          console.log('Login successful:', response.data);
          message.success("Login successful! ");
          localStorage.setItem('token', response.data.token); // Save token to local storage
          localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
          
          const userRole = response.data.userDetails.role;
          switch (userRole) {
            case 'User':
              navigate('/home');
              break;
            case 'Superadmin':
              navigate('/requests/Superadmin');
              break;
            case 'HR':
              navigate('/requests/HR');
              break;
            case 'IT':
              navigate('/requests/IT');
              break;
            // default:
            // setErrorMessage('Invalid role');
          }
        } else {
          setErrorMessage('Invalid credentials');
          message.error("Login failed!");
        }
      } catch (error) {
        setErrorMessage('Invalid credentials');
        console.error('Login error:', error.response?.data || error.message); // optional chaining operator for accessing the properties of object that might be null or undefine
      }
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Enter email"
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
        </div>

        {errorMessage && <div className="error">{errorMessage}</div>}

        <div className="submit-container">
          <button type='submit' className="submit">Login</button>
          <Link to="/signup" className="submit">Create Account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;












