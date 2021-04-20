import React, { useState, useEffect, } from 'react';
import { Table, Row, Col, Button, Card, NavLink, Form, FormControl, Modal, Badge, ProgressBar } from 'react-bootstrap';
import MaterialTable, { MTable, MTableToolbar } from 'material-table'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';
import { getMonthlyBugSummary } from '../../Services/TicketService'
import { FormGroup, Chip } from '@material-ui/core';
import {IoBugSharp,} from 'react-icons/io5'
import {FaCalendarDay} from 'react-icons/fa'




function MonthlyBugSummary() {

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buglist, setbuglist] = useState([])
  const [year, setyear] = useState(2020)
  const [month, setmonth] = useState(11)
  const [isloading, setisloading] = useState(false)
  const [count, setcount] = useState({ total: '', open: '', closed: '' })

  function assignsort(list) {
    for (let i = 0; i < list.length; i++) {
      switch (list[i].priority) {
        case "Urgent":
          list[i].priorityid = 1;
          break;
        case "High":
          list[i].priorityid = 2;
          break;
        case "Medium":
          list[i].priorityid = 3;
          break;
        case "Low":
          list[i].priorityid = 4;
          break;
      }
      switch (list[i].severity) {
        case "Critical":
          list[i].severityid = 1;
          break;
        case "High":
          list[i].severityid = 2;
          break;
        case "Medium":
          list[i].severityid = 3;
          break;
        case "Low":
          list[i].severityid = 4;
          break;
      }
    }
  }

  async function getBugs(year, month) {
    setbuglist([])
    setisloading(true)
    let a = await getMonthlyBugSummary(year, month)
    assignsort(a)
    setbuglist(a)
    countbugs(a);
    setisloading(false)
  }

  useEffect(() => {

    let isMounted = true; // cleanup mounting warning
    getBugs(year, month);
    return () => { isMounted = false }
  }, [])

  function bagetype(priority) {

    switch (priority) {
      case 'Urgent':
        return 'danger';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'primary'
      case 'Low':
        return 'success'
    }
  }
  function severitytype(severity) {

    switch (severity) {
      case 'Critical':
        return (<Tooltip title="Critical"><ArrowUpwardIcon style={{ color: "#dc3545" }} /></Tooltip>);
      case 'High':
        return (<Tooltip title="High"><ArrowUpwardIcon style={{ color: "#ffc107" }} /></Tooltip>);
      case 'Medium':
        return (<Tooltip title="Medium"><ArrowDownwardIcon style={{ color: "#007bff" }} /></Tooltip>);
      case 'Low':
        return (<Tooltip title="Low"><ArrowDownwardIcon style={{ color: "#28a745" }} /></Tooltip>);
    }
  }


  function handleYear(e) {
    setyear(e.target.value)
  }
  function handleMonth(e) {
    setmonth(e.target.value)
    

  }

  function handleSubmit() {
    setbuglist([])
    setisloading(true)
    getBugs(year, month);
  }
  function countbugs(buglist) {
    let total = buglist.length;
    let closed = 0
    if (buglist != null) {
      buglist.forEach((bug) => {
        if (bug.workstate == 4) {
          closed++
        }
        total++
      })
    }
    let open = total - closed
    setcount({ total: total, open: open, closed: closed })

  }

  let yearArray = [2020, 2021, 2022, 2023]

  return (
    <>
      <div >

        <div className="row" style={{ paddingTop: 5 }}>
          <div className="col-md-6">
            <Card.Title><h2> <FaCalendarDay size={45} />{' '}<b>Monthly Bug Summary</b></h2></Card.Title>
          </div>
          <div className="col-md-6">
            <div className="p-2 mb-1">

            </div>
          </div>
        </div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <MaterialTable
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Title', field: 'issuename' },
          { title: "Date", field: "date" },
          { title: 'Priority', field: 'priority', render: rowData => <Badge variant={bagetype(rowData.priority)}>{rowData.priority}</Badge>, customSort: (a, b) => a.priorityid - b.priorityid },
          { title: 'Severity', field: 'severity', render: rowData => severitytype(rowData.severity), customSort: (a, b) => a.severityid - b.severityid }


        ]}
        isLoading={isloading}
        data={buglist}
        title='Monthly Bug Summary'
        components={
          {
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ margin: '10px', display: 'flex' }}>
                  <Form style={{ margin: '10px', display: 'flex' }} onSubmit={handleSubmit}>
                    <FormGroup style={{ padding: '10px' }}>

                      <Form.Label>Year</Form.Label>
                      <Form.Control as='select' name='year' onChange={handleYear} value={year}>
                        {yearArray.map((year) => {
                          return <option value={year}>{year}</option>
                        })}
                        {/* <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>{new Date().getFullYear()}</option> */}
                      </Form.Control>
                    </FormGroup>
                    <FormGroup style={{ padding: '10px' }}>
                      <Form.Label>Month</Form.Label>
                      <Form.Control as='select' name='month' onChange={handleMonth} value={month}>
                        <option value='01'>1</option>
                        <option value='02'>2</option>
                        <option value='03'>3</option>
                        <option value='04'>4</option>
                        <option value='05'>5</option>
                        <option value='06'>6</option>
                        <option value='07'>7</option>
                        <option value='08'>8</option>
                        <option value='09'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                      </Form.Control>
                    </FormGroup>
                    <div style={{ paddingTop: '40px' }}>
                      <Button type='submit'>Filter</Button>
                    </div>
                  </Form>
                  <div style={{ paddingTop: '50px',display:'flex', justifyContent:'flex-end',width:'80%'}}>
                    <h5><Badge variant='primary' className="m-3">Total :  {count.total}</Badge></h5>
                    <h5><Badge variant='success' className="m-3">Closed :   {count.closed}</Badge></h5>
                    <h5><Badge variant='danger' className="m-3">Open :   {count.open}</Badge> </h5>
                  </div>
                </div>
              </div>
            )
          }
        }
      />
    </div>
    </>
  )

}


export default MonthlyBugSummary;