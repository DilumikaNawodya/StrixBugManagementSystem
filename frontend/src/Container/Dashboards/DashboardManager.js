import React from "react";
import BMSHome from "../../Components/BMS/BMSHome/BMSHome";
import { Route, Switch } from "react-router-dom";
import CommonLayout from "./CommonLayout";
import SetDropDown, {
  ManagerHomeSideBar,
  SidebarItemDropManager,
  ManagerReportSideBar,
  ManagerReportSideBarDrop,
  SidebarItemManager
} from "../../Components/BMS/SidebarItem";
import IssueBacklogBMS from "../../Components/BMS/IssueBacklog/IssueBacklogBMS";
import SprintBacklog from "../../Components/BMS/SprintBacklog/SprintBacklog";
import Kanban from "../../Components/BMS/Kanban/Kanban";
import ProjectReportDashboard from "../../Components/Report/ProjectReportDashboard";
import BSPlist from '../../Components/BSP/ManagerBSP';
import BSPlistApproved from "../../Components/BSP/ApprovedBSP";
import TimesheetDashboard from "../../Components/Report/Developer_Timesheet/DevTimesheetDash";
import SprintDashboard from '../../Components/Report/SprintSummary/SprintDashboard'
import MonthlyBugSummary from '../../Components/Report/MonthlyBugSummary'



function DashboardManager() {

  SetDropDown()

  return (
    <Switch>
        <Route exact path="/reports">
          <CommonLayout page={<ProjectReportDashboard />} SidebarItem={ManagerReportSideBar} SidebarItemDrop={[]}/>
        </Route>
        <Route exact path="/timesheet">
          <CommonLayout page={<TimesheetDashboard/>} SidebarItem={ManagerReportSideBar} SidebarItemDrop={[]}/>
        </Route>
        <Route exact path="/sprint_summary">
          <CommonLayout page={<SprintDashboard/>} SidebarItem={ManagerReportSideBar} SidebarItemDrop={[]}/>
        </Route>
        <Route exact path="/monthly_bug_summary">
          <CommonLayout page={<MonthlyBugSummary/>} SidebarItem={ManagerReportSideBar} SidebarItemDrop={[]}/>
        </Route>
        <Route exact path="/kanbanboard/:sid">
          <CommonLayout page={<Kanban />} SidebarItem={SidebarItemManager} SidebarItemDrop={SidebarItemDropManager}/>
        </Route>
        <Route exact path="/issuebacklogbms">
          <CommonLayout page={<IssueBacklogBMS/>} SidebarItem={SidebarItemManager} SidebarItemDrop={SidebarItemDropManager}/>
        </Route>
        <Route exact path="/sprintbacklog">
          <CommonLayout page={<SprintBacklog />} SidebarItem={SidebarItemManager} SidebarItemDrop={SidebarItemDropManager}/>
        </Route>
        <Route exact path="/bspapproval">
          <CommonLayout page={<BSPlist/>} SidebarItem={SidebarItemManager} SidebarItemDrop={SidebarItemDropManager}/>
        </Route>
        <Route exact path="/bsp">
          <CommonLayout page={<BSPlistApproved/>} SidebarItem={SidebarItemManager} SidebarItemDrop={SidebarItemDropManager}/>
        </Route>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BMSHome />} SidebarItem={[]} SidebarItemDrop={ManagerReportSideBarDrop}/>
        </Route>
        
    </Switch>
  );
}

export default DashboardManager
