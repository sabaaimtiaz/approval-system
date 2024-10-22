
import React from 'react';
import { BrowserRouter as  Routes, Route} from 'react-router-dom';
import Home from './Home';
import RequestListing from './RequestListing';  
import Menu from './Menu';

const RoleBasedRequestListing = () => {
  const { role } = useParams(); 
  return <RequestListing role={role} />;  
};
export const Main = () => {
  return (
      <Routes>
        <Route path='/home' element={<Home />} /> 
       {/*  <Route path='/usermenu' element={<Usermenu />} /> */}
        {/* <Route path='/Adduserform' element={<AddUserForm />} /> */}
        {/* <Route path='/UserRequestListing' element={<UserRequestListing />} /> */}
        {/* <Route path='/HRMenu' element={<HRMenu />} /> */}
        {/* <Route path='/HRRequestListing' element={<HRRequestListing />} /> */}
        {/* <Route path='/ITMenu' element={<ITMenu />} /> */}
        {/* <Route path='/ITRequestListing' element={<ITRequestListing />} /> */}
        <Route path='/requests/:role' element={<RoleBasedRequestListing />} />
        <Route path='/Menu' element={<Menu />} />

      </Routes>
  );
};


