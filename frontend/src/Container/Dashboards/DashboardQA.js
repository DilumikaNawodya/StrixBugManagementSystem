import React, { Component } from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Layout from '../Layout';


function DashboardQA() {

  return (
    <Layout>
        <Switch>
        <h1>This is QA page</h1>
        </Switch>
    </Layout>
  )

}

export default DashboardQA;