import React, { Component } from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Layout from '../Layout';


function DashboardManager() {

  return (
    <Layout>
        <Switch>
        <h1>This is Manager page</h1>
        </Switch>
    </Layout>
  )

}

export default DashboardManager;