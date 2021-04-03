import React from 'react';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import { Switch, Route } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { QAHomeSideBar, SidebarItemQA, SidebarItemDropQA } from '../../Components/BMS/SidebarItem';
import IssueBacklogBMS from '../../Components/BMS/IssueBacklog/IssueBacklogBMS';
import {bspService} from '../../Components/BSP/ApprovedBSP';
import SprintBacklog from '../../Components/BMS/SprintBacklog/SprintBacklog';
import Kanban from '../../Components/BMS/Kanban/Kanban';



function DashboardQA() {

  return (
    <Switch>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BMSHome/>} SidebarItem={QAHomeSideBar} SidebarItemDrop={SidebarItemDropQA}/>
        </Route>
        <Route exact path="/issuebacklogbms">
          <CommonLayout page={<IssueBacklogBMS/>} SidebarItem={SidebarItemQA} SidebarItemDrop={SidebarItemDropQA}/>
        </Route>
        <Route exact path="/bsp">
          <CommonLayout page={<bspService.BSPlistApproved/>} SidebarItem={SidebarItemQA} SidebarItemDrop={SidebarItemDropQA}/>
        </Route>
        <Route exact path="/sprintbacklog">
        <CommonLayout
          page={<SprintBacklog />}
          SidebarItem={SidebarItemQA}
          SidebarItemDrop={SidebarItemDropQA}
        />
      </Route>
      <Route exact path="/kanbanboard">
        <CommonLayout
          page={<Kanban />}
          SidebarItem={SidebarItemQA}
          SidebarItemDrop={SidebarItemDropQA}
        />
        </Route>
      
    </Switch>
  )

}

export default DashboardQA;