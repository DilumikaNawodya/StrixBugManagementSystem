import React, { useState, useEffect, } from 'react';
import { Table, Row, Col, Button, Card, NavLink, Form, FormControl, Modal, Badge, ProgressBar } from 'react-bootstrap';
import MaterialTable, { MTable, MTableToolbar } from 'material-table'
import { render } from '@testing-library/react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';
import { getMonthlyBugSummary } from '../../Services/TicketService'
import { FormGroup, Chip } from '@material-ui/core';
import { IoBugSharp, } from 'react-icons/io5'
import { FaCalendarDay } from 'react-icons/fa'
import Issuecard from '../BCL//IssueBacklog/IssueTable/Issuecard'
import Error from '../Common/Errors/Error';
import Preloader from '../Common/Preloader/Preloader';



function MonthlyBugSummary() {

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buglist, setbuglist] = useState([])
  const [year, setyear] = useState(2020)
  const [month, setmonth] = useState(11)
  const [count, setcount] = useState({ total: '', open: '', closed: '' })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

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
  function tableticket(e) {
    for (var i = 0; i < buglist.length; i++) {
      if (buglist[i].id === e) {
        render(<Issuecard
          id={buglist[i].id}
          name={buglist[i].issuename}
          priority={buglist[i].priority}
          type={buglist[i].bugtype}
          summary={buglist[i].issuedescription}
          variant={bagetype(buglist[i].priority)}
          severity={buglist[i].severity}
          svariant={severitytype(buglist[i].severity)}
          reporter={buglist[i].createdby.fullname}
          created={buglist[i].date}
          status={buglist[i].workstatetext}
          attachment={buglist[i].ticketMedia}
          severity_icon={severitytype(buglist[i].severity)} />);
      }
    }

  }

  async function getBugs(year, month) {
    try {
      setbuglist([])
      let a = await getMonthlyBugSummary(year, month)
      assignsort(a)
      setbuglist(a)
      countbugs(a);
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
      setMessage(error.response.data.detail)
    }
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
        return 'success'
      case 'Low':
        return 'primary'
    }
  }
  function severitytype(severity) {

    switch (severity) {
      case 'Critical':
        return 'danger';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'success'
      case 'Low':
        return 'primary'
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
      })
    }
    let open = total - closed
    setcount({ total: total, open: open, closed: closed })

  }

  let yearArray = [2020, 2021, 2022, 2023]

  return (
    <>
      <div >
        {!error && <div className="row" style={{ paddingTop: 5 }}>
          <div className="col-md-6">
            <Card.Title><h2> <FaCalendarDay size={45} />{' '}<b>Monthly Bug Summary</b></h2></Card.Title>
          </div>
          <div className="col-md-6">
            <div className="p-2 mb-1">

            </div>
          </div>
        </div>}
        {!error && <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />}
        {!error && <MaterialTable
          columns={[
            { title: 'Id', field: 'id' },
            { title: 'Title', field: 'issuename' },
            { title: "Date", field: "date" },
            { title: 'Priority', field: 'priority', render: rowData => <Badge variant={bagetype(rowData.priority)}>{rowData.priority}</Badge>, customSort: (a, b) => a.priorityid - b.priorityid },
            { title: 'Severity', field: 'severity', render: rowData => <Badge variant={severitytype(rowData.severity)}>{rowData.severity}</Badge>, customSort: (a, b) => a.severityid - b.severityid }
          ]}
          data={buglist}
          title='Monthly Bug Summary'
          onRowClick={(event, rowData) => { tableticket(rowData.id) }}
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
                    <div style={{ paddingTop: '50px', display: 'flex', justifyContent: 'flex-end', width: '80%' }}>
                      <h5><Badge variant='primary' className="m-3">Total :  {count.total}</Badge></h5>
                      <h5><Badge variant='success' className="m-3">Closed :   {count.closed}</Badge></h5>
                      <h5><Badge variant='danger' className="m-3">Open :   {count.open}</Badge> </h5>
                    </div>
                  </div>
                </div>
              )
            }
          }
        />}

        {loading && <div>

          <Preloader />

        </div>}

        {error && <div>

          <Error message={message} />

        </div>}

      </div>
    </>
  )

}


export default MonthlyBugSummary;