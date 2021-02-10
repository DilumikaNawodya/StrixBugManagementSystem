import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import AdminHome from '../../Components/Admin/AdminHome/AdminHome';
import AdminLayout from '../../Components/Admin/AdminLayout';
import NavBar from '../../Components/Common/Navbar/NavBar';
import { createBrowserHistory } from 'history';
import UserTableInternal from '../../Components/Admin/Users/UserTableInternal';
import UserTableExternal from '../../Components/Admin/Users/UserTableExternal';
import Projects from '../../Components/Admin/Projects/Projects';

const history = createBrowserHistory();

function DashboardAdmin() {

  return (
    <>
        <Route exact path="/Admin">
          <NavBar/>
          <AdminHome/>
        </Route>
        <Route exact path="/Admin/ExternalUsers">
          <AdminLayout page={<UserTableExternal/>}/>
        </Route>
        <Route exact path="/Admin/InternalUsers">
          <AdminLayout page={<UserTableInternal/>}/>
        </Route>
        <Route exact path="/Admin/Projects">
          <AdminLayout page={<Projects/>}/>
        </Route>
        <Route exact path="/Admin/Permissions">
          <AdminLayout/>
        </Route>
    </>
  )
}

export default DashboardAdmin;