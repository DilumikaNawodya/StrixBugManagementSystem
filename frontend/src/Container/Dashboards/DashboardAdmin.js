import React from 'react';
import { Nav } from 'react-bootstrap';
import AdminHome from '../../Components/Admin/AdminHome';
import Footer from '../../Components/Common/Footer/Footer';
import NavBar from '../../Components/Common/Navbar/Navbar';


function DashboardAdmin() {

  return (
    <>
    <NavBar items={false} page={<AdminHome/>} sideBarItems={[]}/>
    <Footer/>
    </>
  )
}

export default DashboardAdmin;