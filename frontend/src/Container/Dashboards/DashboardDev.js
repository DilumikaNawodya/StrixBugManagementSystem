import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import CommonLayout from './CommonLayout';
import { DeveloperHomeSideBar, SidebarItem, SidebarItemDrop } from '../../Components/BMS/SidebarItem';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';

function DashboardDev() {

  return (
    <Switch>
        <Route exact path="/issuebacklogbms">
          <CommonLayout page={<IssueBacklogBMS/>} SidebarItem={SidebarItem} SidebarItemDrop={SidebarItemDrop}/>
        </Route>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BMSHome/>} SidebarItem={DeveloperHomeSideBar} SidebarItemDrop={SidebarItemDrop}/>
        </Route>
    </Switch>
  )

}

export default DashboardDev;