import React from 'react';
import { Route } from 'react-router-dom';
import BCLHome from '../../Components/BCL/BCLHome';
import IssueBacklogBCL from '../../Components/BCL/IssueBacklog/IssueBacklogBCL';
import Footer from '../../Components/Common/Footer/Footer';
import NavBar from '../../Components/Common/Navbar/Navbar';



const sidebarItems = {
  Dashboard: "/Customer",
  Backlog: "/Customer/IssueBacklogBCL/"
}

function DashboardCus() {

  return (
      <>
        <Route exact path="/Customer">
          <NavBar items={false} page={<BCLHome/>} sideBarItems={[]}/>
          <Footer/>
        </Route>
        <Route exact path="/Customer/IssueBacklogBCL/:pid">
          <NavBar items={true} page={<IssueBacklogBCL/>} sideBarItems={sidebarItems}/>
          <Footer/>
        </Route>
      </>
  )

}

export default DashboardCus;