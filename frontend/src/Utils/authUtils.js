import { message } from "antd";
export const logout = (navigate) => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
  
    navigate('/login');
  
    //alert('You have been logged out successfully.');
    message.success('You have been logged out successfully.');
  };
  