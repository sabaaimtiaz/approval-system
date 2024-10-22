import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/auth/validate-token', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { valid } = await response.json();
          setIsValid(valid);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error('Token validation failed', error);
        setIsValid(false);
      }
    };

    validateToken();
  }, []);

 
  if (isValid === null) return null;  //prevent the component from rendering while waiting for thr validation 
  return isValid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
