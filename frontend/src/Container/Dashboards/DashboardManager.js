import React from 'react';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import { Route } from 'react-router-dom';
import BMSLayout from '../../Components/BMS/BMSLayout';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';
import ProjectReportDashboard from '../../Components/Report/ProjectReportDashboard';
import NavBar from '../../Components/Common/Navbar/NavBar';
import ReportLayout from '../../Components/Report/ReportLayout';
import DevTimesheetDash from '../../Components/Report/Developer_Timesheet/DevTimesheetDash'
import AlldataTable from '../../Components/Report/Developer_Timesheet/AllDataTable/AlldataTable';
import FilreredData from '../../Components/Report/Developer_Timesheet/FilteredTable/FilreredData';

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
        <ReportLayout page={<ProjectReportDashboard/>}/>
      </Route>
      <Route exact path="/Manager/DeveloperTimesheeet">
        <ReportLayout page={<DevTimesheetDash/>}/>
      </Route>
      <Route exact path="/Manager/DeveloperTimesheeet/AlldataTable">
        <ReportLayout page={<AlldataTable/>}/>
      </Route>
      <Route exact path="/Manager/DeveloperTimesheeet/FilreredTable">
        <ReportLayout page={<FilreredData/>}/>
      </Route>
      <Route exact path="/Manager/SprintBacklog/">
        <BMSLayout/>
      </Route>
    </>
  )
}

export default DashboardManager;