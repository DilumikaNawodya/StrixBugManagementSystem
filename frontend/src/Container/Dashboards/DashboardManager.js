import React from "react";
import BMSHome from "../../Components/BMS/BMSHome/BMSHome";
import { Route, Switch } from "react-router-dom";
import CommonLayout from "./CommonLayout";
import {
  ManagerHomeSideBar,
  SidebarItem,
  SidebarItemDropManager,
  SidebarItemManager
} from "../../Components/BMS/SidebarItem";
import IssueBacklogBMS from "../../Components/BMS/IssueBacklog/IssueBacklogBMS";
import SprintBacklog from "../../Components/BMS/SprintBacklog/SprintBacklog";
import Kanban from "../../Components/BMS/Kanban/Kanban";
import ProjectReportDashboard from "../../Components/Report/ProjectReportDashboard";
import {bspService} from '../../Components/BSP/ApprovedBSP';
import {ManagerbspService} from '../../Components/BSP/ManagerBSP';


function DashboardManager() {
  return (
    <Switch>
      <Route exact path="/reports">
        <CommonLayout
          page={<ProjectReportDashboard />}
          SidebarItem={SidebarItem}
          SidebarItemDrop={SidebarItemDropManager}
        />
      </Route>
      <Route exact path="/kanbanboard">
        <CommonLayout
          page={<Kanban />}
          SidebarItem={SidebarItem}
          SidebarItemDrop={SidebarItemDropManager}
        />
      </Route>
      <Route exact path="/issuebacklogbms">
          <CommonLayout page={<IssueBacklogBMS/>} SidebarItem={SidebarItemManager} SidebarItemDrop={SidebarItemDropManager}/>
        </Route>
      <Route exact path="/sprintbacklog">
        <CommonLayout
          page={<SprintBacklog />}
          SidebarItem={SidebarItem}
          SidebarItemDrop={SidebarItemDropManager}
        />
      </Route>
      <Route exact path={["/", "/home"]}>
        <CommonLayout
          page={<BMSHome />}
          SidebarItem={ManagerHomeSideBar}
          SidebarItemDrop={SidebarItemDropManager}
        />
      </Route>
      <Route exact path="/bspapproval">
          <CommonLayout page={<ManagerbspService.BSPlist/>} SidebarItem={SidebarItemManager} SidebarItemDrop={SidebarItemDropManager}/>
        </Route>
        <Route exact path="/bsp">
          <CommonLayout page={<bspService.BSPlistApproved/>} SidebarItem={SidebarItemManager} SidebarItemDrop={SidebarItemDropManager}/>
        </Route>
    </Switch>
  );
}

export default DashboardManager;
