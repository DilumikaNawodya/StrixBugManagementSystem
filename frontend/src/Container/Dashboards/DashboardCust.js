import React from 'react';
import { Route } from 'react-router-dom';
import BCLHome from '../../Components/BCL/BCLHome/BCLHome';
import BCLLayout from '../../Components/BCL/BCLLayout';
import NavBar from '../../Components/Common/Navbar/NavBar';

function DashboardCus() {

  return (
      <>
        <Route exact path="/Customer">
          <NavBar/>
          <BCLHome/>
        </Route>
        <Route exact path="/Customer/IssueBacklogBCL/:pid">
          <BCLLayout/>
        </Route>
      </>
  )

}

export default DashboardCus;