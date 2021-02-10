import React from 'react';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import { Route } from 'react-router-dom';
import NavBar from '../../Components/Common/Navbar/NavBar';


function DashboardQA() {

  return (
    <>
      <Route exact path="/QA">
        <NavBar/>
      </Route>
      <Route exact path="/QA/IssueBacklogBMS/:pid">
        <NavBar/>
      </Route>
    </>
  )

}

export default DashboardQA;