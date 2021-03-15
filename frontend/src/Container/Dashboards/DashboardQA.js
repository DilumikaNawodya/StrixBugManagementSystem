import React from 'react';
import BMSHome from '../../Components/BMS/BMSHome/BMSHome';
import { Switch, Route } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { QAHomeSideBar, SidebarItem, SidebarItemDrop } from '../../Components/BMS/SidebarItem';

function DashboardQA() {

  return (
    <Switch>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BMSHome/>} SidebarItem={QAHomeSideBar} SidebarItemDrop={SidebarItemDrop}/>
        </Route>
    </Switch>
  )

}

export default DashboardQA;