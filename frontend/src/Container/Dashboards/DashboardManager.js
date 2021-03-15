import React from 'react';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import { Route, Switch } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { ManagerHomeSideBar, SidebarItem, SidebarItemDrop } from '../../Components/BMS/SidebarItem';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';

function DashboardManager() {

  return (
    <Switch>
        <Route exact path="/issuebacklogbms">
          <CommonLayout page={<IssueBacklogBMS/>} SidebarItem={SidebarItem} SidebarItemDrop={SidebarItemDrop}/>
        </Route>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BMSHome/>} SidebarItem={ManagerHomeSideBar} SidebarItemDrop={SidebarItemDrop}/>
        </Route>
    </Switch>
  )
}

export default DashboardManager;