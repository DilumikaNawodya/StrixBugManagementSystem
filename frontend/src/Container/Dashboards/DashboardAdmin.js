import React, { Component } from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import AdminHome from '../../Components/Admin/AdminHome';
import Layout from '../Layout';


function DashboardAdmin() {

  return (
    <Layout>
        <AdminHome />
    </Layout>
  )

}

export default DashboardAdmin;