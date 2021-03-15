import React from 'react';
import BCLHome from '../../Components/BCL/BCLHome/BCLHome';
import { Route, Switch } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { CustomerHomeSideBar, SidebarItem, SidebarItemDrop } from '../../Components/BCL/SidebarItem';


function DashboardCus() {

  return (
    <Switch>
        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<BCLHome/>} SidebarItem={CustomerHomeSideBar} SidebarItemDrop={SidebarItemDrop}/>
        </Route>
    </Switch>
  )

}

export default DashboardCus;