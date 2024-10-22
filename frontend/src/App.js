
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
//import Usermenu from "./Usermenu";
//import AddUserForm from "./AddUserForm";
//import UserRequestListing from "./UserRequestListing";
//import HRMenu from "./HRMenu";
//import HRRequestListing from "./HRRequestListing";
//import ITMenu from "./ITMenu";
//import ITRequestListing from "./ITRequestListing";
import ProtectedRoute from "./AuthGuard";
import RequestListing from "./RequestListing";
import Menu from "./Menu";

export const App = () => {
  //const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <Router> 
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

       
        <Route
          path="/home"
          element={
            <ProtectedRoute >
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/usermenu"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Usermenu />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/Adduserform"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddUserForm />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/UserRequestListing"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserRequestListing />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/HRMenu"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HRMenu />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/HRRequestListing"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HRRequestListing />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/ITMenu"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ITMenu />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/Menu"
          element={
            <ProtectedRoute >
              <Menu />
            </ProtectedRoute>
          }
        />
       
        <Route
  path="/requests/:role" //url parameter 
  element={
    <ProtectedRoute >
      <RequestListing />
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<Navigate to= "/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;











