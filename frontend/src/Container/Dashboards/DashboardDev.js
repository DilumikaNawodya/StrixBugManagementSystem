import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import CommonLayout from './CommonLayout';
import SetDropDown, { DeveloperHomeSideBar, SidebarItemDeveloper, SidebarItemDropDeveloper } from '../../Components/BMS/SidebarItem';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';
import BSPlistApproved from '../../Components/BSP/ApprovedBSP';
import SprintBacklog from '../../Components/BMS/SprintBacklog/SprintBacklog';
import Kanban from '../../Components/BMS/Kanban/Kanban';

function DashboardDev() {

  SetDropDown()

  return (
    <Switch>
        <Route exact path="/issuebacklogbms">
          <CommonLayout page={<IssueBacklogBMS/>} SidebarItem={SidebarItemDeveloper} SidebarItemDrop={SidebarItemDropDeveloper}/>
        </Route>
        <Route exact path="/bsp">
          <CommonLayout page={<BSPlistApproved/>} SidebarItem={SidebarItemDeveloper} SidebarItemDrop={SidebarItemDropDeveloper}/>
        </Route>
        <Route exact path="/sprintbacklog">
          <CommonLayout page={<SprintBacklog />} SidebarItem={SidebarItemDeveloper} SidebarItemDrop={SidebarItemDropDeveloper}/>
        </Route>
        <Route exact path="/kanbanboard/:sid">
          <CommonLayout page={<Kanban />} SidebarItem={SidebarItemDeveloper} SidebarItemDrop={SidebarItemDropDeveloper}/>
        </Route>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BMSHome/>} SidebarItem={DeveloperHomeSideBar} SidebarItemDrop={[]}/>
        </Route>
    </Switch>
  )

}

export default DashboardDev