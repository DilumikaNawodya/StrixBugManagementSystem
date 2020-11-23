import React from 'react';
import BMSHome from '../../Components/BMS/BMSHome';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';
import { Route } from 'react-router-dom';
import Footer from '../../Components/Common/Footer/Footer';
import NavBar from '../../Components/Common/Navbar/Navbar';


const sidebarItems = {
  Dashboard: "/QA",
  Backlog: "/QA/IssueBacklogBMS/",
  Sprints: {
    "Sprint 1": "#",
    "Sprint 2": "#",
    "Sprint 3": "#"
  }
}
function DashboardQA() {

  return (
    <>
      <Route exact path="/QA">
        <NavBar items={false} page={<BMSHome />} sideBarItems={[]} />
        <Footer />
      </Route>
      <Route exact path="/QA/IssueBacklogBMS/:pid">
        <NavBar items={true} page={<IssueBacklogBMS/>} sideBarItems={sidebarItems} />
        <Footer />
      </Route>
    </>
  )

}

export default DashboardQA;