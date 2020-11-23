import React from 'react';
import BMSHome from '../../Components/BMS/BMSHome';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';
import { Route } from 'react-router-dom';
import Footer from '../../Components/Common/Footer/Footer';
import NavBar from '../../Components/Common/Navbar/Navbar';
import ProjectReportDashboard from '../../Components/Report/ProjectReportDashboard';
import SprintBacklog from '../../Components/BMS/SprintBacklog/SprintBacklog';

const sidebarItems = {
  Dashboard: "/Manager",
  Backlog: "/Manager/IssueBacklogBMS/",
  Sprints: "/Manager/SprintBacklog",
  Reports: {
    "Report Dashboard": "/Manager/ReportDashboard",
    "Developer Time Sheet": "#",
    "Project Time Sheet": "#",
    "Sprint Report": "#",
    "Full Bug Summary": "#" 
  }
}

function DashboardManager() {

  return (
    <>
      <Route exact path="/Manager">
        <NavBar items={false} page={<BMSHome />} sideBarItems={[]} />
        <Footer />
      </Route>
      <Route exact path="/Manager/IssueBacklogBMS/:pid">
        <NavBar items={true} page={<IssueBacklogBMS/>} sideBarItems={sidebarItems}/>
        <Footer />
      </Route>
      <Route exact path="/Manager/ReportDashboard">
        <NavBar items={true} page={<ProjectReportDashboard/>} sideBarItems={sidebarItems} />
        <Footer />
      </Route>
      <Route exact path="/Manager/SprintBacklog/">
        <NavBar items={true} page={<SprintBacklog/>} sideBarItems={sidebarItems} />
        <Footer />
      </Route>
    </>
  )
}

export default DashboardManager;