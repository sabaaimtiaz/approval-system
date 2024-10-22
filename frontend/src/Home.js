
import { message } from 'antd';
import React, { useState } from 'react';
import { logout } from './Utils/authUtils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    request_title: '',
    description: '',
    request_type: 'HR',
    request_subtype: 'Leave',
  });
 
//setFormData({description: res?.data?.data, request_title: "HR"})

  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate); // Call the logout function and pass navigate
  };

  const handleChange = (e) => { //event trigger 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  //without reloading 
    try {
      const response = await axios.post('http://localhost:3001/auth/request', formData);
      console.log('Request added successfully:', response.data);
      message.success('Request submitted successfully!');
      //  clear the form and give feedback to the user
      setFormData({
        first_name: '',
        last_name: '',
        request_title: '',
        description: '',
        request_type: '',
        request_subtype: '',
      });
    } catch (error) {
      console.error('Error during request submission:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <>
    < nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand" href="#">Approval System</a>
        <ul className="navbar-nav">
         
          {/* <li className="nav-item">
            <a  style={{color: "purple"}} className="nav-link" >ALL Requests</a>
          </li> */}
          <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>Logout</a> {/* Trigger logout */}
          </li>
        </ul>
      </div>
    </nav>
    <div className='container'>
      <div className="header">
        <div className="text">Request Application Form</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='container1'>
          <div className='fname'>
            <label htmlFor="first_name">First Name*</label>
            <input
              type="text"
              name="first_name"
              placeholder='Enter First Name'
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='lname'>
            <label htmlFor="last_name">Last Name*</label>
            <input
              type="text"
              name="last_name"
              placeholder='Enter Last Name'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className='container2'>
          <div className='reqtitle'>
            <label htmlFor="request_title">Request Title*</label>
            <input
              type="text"
              name="request_title"
              placeholder='Enter Request Title'
              value={formData.request_title}
              onChange={handleChange}
              required
            />
          </div>
          <div className='desc'>
            <label htmlFor="description">Description*</label>
            <textarea
              name="description"
              placeholder='Enter Description'
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <div className='container3'>
          <div className='reqtype'>
            <label htmlFor="request_type">Request Type*</label>
            <select
              name="request_type"
              value={formData.request_type}
              onChange={handleChange}
              required
            >
              <option value="HR">HR</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className='reqsubtype'>
            <label htmlFor="request_subtype">Request Sub Type*</label>
            <select
              name="request_subtype"
              value={formData.request_subtype}
              onChange={handleChange}
              required
            >
              <option value="Leave">Leave</option>
              <option value="Half Leave">Half Leave</option>
              <option value="Full Leave">Full leave </option>
              <option value="Mouse Repairing">Mouse Repairing</option>
              <option value="Head Set">Head Set</option>
            </select>
          </div>
        </div>
        <button  type='submit'
         >Submit</button>/
        
      </form>
    </div>
    // </>
  );
};

export default Home;








