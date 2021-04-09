import React from 'react';
import BCLHome from '../../Components/BCL/BCLHome/BCLHome';
import { Route, Switch } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { CustomerHomeSideBar, SidebarItem, SidebarItemDrop } from '../../Components/BCL/SidebarItem';
import IssueBacklogBCL from '../../Components/BCL/IssueBacklog/IssueBacklogBCL';


function DashboardCus() {

  return (
    <Switch>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BCLHome/>} SidebarItem={[]} SidebarItemDrop={[]}/>
        </Route>
        <Route exact path={'/issuebacklogbcl'}>
          <CommonLayout page={<IssueBacklogBCL/>} SidebarItem={[]} SidebarItemDrop={[]}/>
        </Route>
    </Switch>
  )

}

export default DashboardCus;