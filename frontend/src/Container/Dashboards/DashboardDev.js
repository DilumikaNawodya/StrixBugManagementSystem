import React from 'react';
import { Route } from 'react-router-dom';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import NavBar from '../../Components/Common/Navbar/NavBar';


function DashboardDev() {

  return (
    <>
      <Route exact path="/Developer">
        <NavBar/>
      </Route>
      <Route exact path="/Developer/IssueBacklogBMS/:pid">
        <NavBar/>
      </Route>
    </>
  )

}

export default DashboardDev;