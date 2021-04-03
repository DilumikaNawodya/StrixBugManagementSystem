import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import CommonLayout from './CommonLayout';
import { DeveloperHomeSideBar, SidebarItemDeveloper, SidebarItemDropDeveloper } from '../../Components/BMS/SidebarItem';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';
import {bspService} from '../../Components/BSP/ApprovedBSP';
import SprintBacklog from '../../Components/BMS/SprintBacklog/SprintBacklog';
import Kanban from '../../Components/BMS/Kanban/Kanban';

function DashboardDev() {

  return (
    <Switch>
        <Route exact path="/issuebacklogbms">
          <CommonLayout page={<IssueBacklogBMS/>} SidebarItem={SidebarItemDeveloper} SidebarItemDrop={SidebarItemDropDeveloper}/>
        </Route>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BMSHome/>} SidebarItem={DeveloperHomeSideBar} SidebarItemDrop={SidebarItemDropDeveloper}/>
        </Route>
        <Route exact path="/bsp">
          <CommonLayout page={<bspService.BSPlistApproved/>} SidebarItem={SidebarItemDeveloper} SidebarItemDrop={SidebarItemDropDeveloper}/>
        </Route>
        <Route exact path="/sprintbacklog">
        <CommonLayout
          page={<SprintBacklog />}
          SidebarItem={SidebarItemDeveloper}
          SidebarItemDrop={SidebarItemDropDeveloper}
        />
      </Route>
      <Route exact path="/kanbanboard">
        <CommonLayout
          page={<Kanban />}
          SidebarItem={SidebarItemDeveloper}
          SidebarItemDrop={SidebarItemDropDeveloper}
        />
        </Route>
    </Switch>
  )

}

export default DashboardDev;