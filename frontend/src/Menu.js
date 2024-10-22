import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './usermenu.css'; 
import { logout } from './Utils/authUtils';

const Menu = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    setUserData(userData);
  }, []);


const handleLogout = () => {
    logout(navigate); 
  };


  if (!userData) {
    return null; 
  }

  const { role } = userData;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand">Approval System</a>
        <ul className="navbar-nav">
          {role === 'Superadmin' && (
            <>
              <li className="nav-item">
                <a className="nav-link" style={{color: "purple"}} href='/requests/Superadmin'>ALL Requests</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup?type=superadmin">Add User</a>
              </li>
            </>
          )}
          {role === 'HR' && (
            <>
              <li className="nav-item">
                <a target='_blank' className="nav-link" style={{color: "purple"}}href='/requests/HR'>ALL Requests</a>
              </li>
            </>
          )}
          {role === 'IT' && (
            <>
              <li className="nav-item">
                <a className="nav-link" style={{color: "purple"}} href='/requests/IT'>ALL Requests</a>
              </li>
            </>
          )}
          {/* {role === 'User' && (
            <>
            <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>Logout</a>
          </li>
            </>
          )} */}
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
