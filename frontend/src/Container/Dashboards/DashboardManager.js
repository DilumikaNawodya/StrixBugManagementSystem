import React from "react";
import BMSHome from "../../Components/BMS/BMSHome/BMSHome";
import { Route, Switch } from "react-router-dom";
import CommonLayout from "./CommonLayout";
import {
  ManagerHomeSideBar,
  SidebarItem,
  SidebarItemDrop,
} from "../../Components/BMS/SidebarItem";
import IssueBacklogBMS from "../../Components/BMS/IssueBacklog/IssueBacklogBMS";
import SprintBacklog from "../../Components/BMS/SprintBacklog/SprintBacklog";
import Kanban from "../../Components/BMS/Kanban/Kanban";
import ProjectReportDashboard from "../../Components/Report/ProjectReportDashboard";

function DashboardManager() {
  return (
    <Switch>
      <Route exact path="/reports">
        <CommonLayout
          page={<ProjectReportDashboard />}
          SidebarItem={SidebarItem}
          SidebarItemDrop={SidebarItemDrop}
        />
      </Route>
      <Route exact path="/kanbanboard">
        <CommonLayout
          page={<Kanban />}
          SidebarItem={SidebarItem}
          SidebarItemDrop={SidebarItemDrop}
        />
      </Route>
      <Route exact path="/issuebacklogbms">
        <CommonLayout
          page={<IssueBacklogBMS />}
          SidebarItem={SidebarItem}
          SidebarItemDrop={SidebarItemDrop}
        />
      </Route>
      <Route exact path="/sprintbacklog">
        <CommonLayout
          page={<SprintBacklog />}
          SidebarItem={SidebarItem}
          SidebarItemDrop={SidebarItemDrop}
        />
      </Route>
      <Route exact path={["/", "/home"]}>
        <CommonLayout
          page={<BMSHome />}
          SidebarItem={ManagerHomeSideBar}
          SidebarItemDrop={SidebarItemDrop}
        />
      </Route>
    </Switch>
  );
}

export default DashboardManager;
