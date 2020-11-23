import React from 'react';
import { Route } from 'react-router-dom';
import BMSHome from '../../Components/BMS/BMSHome';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';
import Footer from '../../Components/Common/Footer/Footer';
import NavBar from '../../Components/Common/Navbar/Navbar';


const sidebarItems = {
  Dashboard: "/Developer",
  Backlog: "/Developer/IssueBacklogBMS/",
  Sprints: {
    "Sprint 1": "#",
    "Sprint 2": "#",
    "Sprint 3": "#"
  }
}


function DashboardDev() {

  return (
    <>
      <Route exact path="/Developer">
        <NavBar items={false} page={<BMSHome />} sideBarItems={[]} />
        <Footer />
      </Route>
      <Route exact path="/Developer/IssueBacklogBMS/:pid">
        <NavBar items={true} page={<IssueBacklogBMS/>} sideBarItems={sidebarItems} />
        <Footer />
      </Route>
    </>
  )

}

export default DashboardDev;