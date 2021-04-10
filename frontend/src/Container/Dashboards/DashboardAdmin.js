import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminHome from '../../Components/Admin/AdminHome/AdminHome';
import UserTableInternal from '../../Components/Admin/Users/UserTableInternal';
import UserTableExternal from '../../Components/Admin/Users/UserTableExternal';
import Projects from '../../Components/Admin/Projects/Projects';
import CommonLayout from './CommonLayout';
import { AdminHomeSideBar, SidebarItem, SidebarItemDrop } from '../../Components/Admin/SidebarItem';
import ProjectList from '../../Components/Admin/Projects/ProjectList';
import AccessControl from '../../Components/Admin/Projects/AccessControl';

function DashboardAdmin() {

  return (
    <Switch>
        <Route exact path="/externalusers">
          <CommonLayout page={<UserTableExternal/>} SidebarItem={SidebarItem} SidebarItemDrop={SidebarItemDrop}/>
        </Route>

        <Route exact path="/internalusers">
          <CommonLayout page={<UserTableInternal/>} SidebarItem={SidebarItem} SidebarItemDrop={SidebarItemDrop}/>
        </Route>

        <Route exact path="/projects">
          <CommonLayout page={<Projects/>} SidebarItem={SidebarItem} SidebarItemDrop={SidebarItemDrop}/>
        </Route>

        <Route exact path="/permissions">
          <CommonLayout page={<ProjectList/>} SidebarItem={SidebarItem} SidebarItemDrop={SidebarItemDrop}/>
        </Route>

        <Route exact path="/access">
          <CommonLayout page={<AccessControl/>} SidebarItem={SidebarItem} SidebarItemDrop={SidebarItemDrop}/>
        </Route>

        <Route exact path={["/", "/home"]}>
          <CommonLayout page={<AdminHome/>} SidebarItem={AdminHomeSideBar} SidebarItemDrop={SidebarItemDrop}/>
        </Route>

    </Switch>
  )
}

export default DashboardAdmin;