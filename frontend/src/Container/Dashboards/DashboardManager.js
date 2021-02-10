import React from 'react';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import { Route } from 'react-router-dom';
import BMSLayout from '../../Components/BMS/BMSLayout';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';
import ProjectReportDashboard from '../../Components/Report/ProjectReportDashboard';
import NavBar from '../../Components/Common/Navbar/NavBar';


function DashboardManager() {

  return (
    <>
      <Route exact path="/Manager">
        <NavBar/>
        <BMSHome/>
      </Route>
      <Route exact path="/Manager/IssueBacklogBMS/:pid">
        <BMSLayout page={<IssueBacklogBMS/>}/>
      </Route>
      <Route exact path="/Manager/ReportDashboard">
        <BMSLayout page={<ProjectReportDashboard/>}/>
      </Route>
      <Route exact path="/Manager/SprintBacklog/">
        <BMSLayout/>
      </Route>
    </>
  )
}

export default DashboardManager;