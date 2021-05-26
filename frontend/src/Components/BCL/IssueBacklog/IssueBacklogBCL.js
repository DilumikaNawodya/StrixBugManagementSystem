import React, { useState, useEffect, } from 'react';
import { Table, Row, Col, Button, Card, NavLink, Form, FormControl, Modal, Badge } from 'react-bootstrap';
import IssueForm from '../IssueBacklog/CreateIssue/IssueForm'
import Issuecard from '../IssueBacklog/IssueTable/Issuecard'
// import './table.css';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams } from "react-router-dom";
import './IssueBacklogBCL.scss'
import getTickets from '../../../Services/TicketService';
import { GetProjetDetails, projectService } from '../../../Services/ProjectService';
import MaterialTable from 'material-table'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';
import Error from '../../Common/Errors/Error';


//my
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
      return 'danger';
    case 'High':
      return 'warning';
    case 'Medium':
      return 'primary'
    case 'Low':
      return 'success'
  }
}



let recordedChunks = []
// function capstreme(stream) {
//   let mediaRecorder = new MediaRecorder(stream)
//   mediaRecorder.ondataavailable = handleDataAvailable;
//   mediaRecorder.start();

//   function handleDataAvailable(event) {
//     console.log("data-available");
//     if (event.data.size > 0) {
//       recordedChunks.push(event.data);
//       console.log(recordedChunks);
//       download();
//     } else {
//       // ...
//     }
//   }
//   function download() {
//     var blob = new Blob(recordedChunks, {
//       type: "video/mp4"
//     });
//     var url = URL.createObjectURL(blob);
//     var a = document.createElement("a");
//     document.body.appendChild(a);
//     a.style = "display: none";
//     a.href = url;
//     a.download = "test.mp4";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   }
// }

////////////////////////////////////////////////////

function IssueBacklogBCL() {

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buglist, setbuglist] = useState([])
  const [pdetails, setpdetails] = useState([{ description: "", projectname: "" }])
  const [isLoading, setisLoading] = useState(false)

  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  // let loc = useLocation().project

  //used for React-table remove if unnecessary

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: 'ID',
  //       accessor: 'id',
  //       Cell: ({ value }) => (<span>{value}</span>),
  //     },
  //     {
  //       Header: 'Title',
  //       accessor: 'issuename'
  //     },
  //     {
  //       Header: 'Prority',
  //       accessor: 'priority',
  //       Cell: ({ value }) => (<Badge variant={bagetype(value)}>{value}</Badge>),



  //     }
  //   ],
  //   []
  // )



  //details of a ticket
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

  //test sorting
  // function sorting(type) {
  //   switch (type) {
  //     case "priority":

  //       break;
  //   }
  // }
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
  //*********************************
  //check project id empty or not
  // if (loc) {
  //   sessionStorage.setItem("loc", loc)

  const pid = projectService.getCurrentProject()


  async function fetchtickets() {
    setisLoading(true)
    try {
      let a = await getTickets(pid)
      assignsort(a)
      setbuglist(a)
    } catch (error) {
      setError(true)
      setMessage(error.response.data.detail)
    }
    setisLoading(false)

  }
  async function fetch_project_details() {
    let b = await GetProjetDetails(pid)
    setpdetails(b)

  }

  useEffect(() => {

    let isMounted = true; // cleanup mounting warning
    fetchtickets();
    fetch_project_details();

    return () => { isMounted = false }
  }, [])

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Row >
        <div className="ml-2 mt-2 col-md-12">
          <Col className="">
            {!error && <Row className="">
              {/* <Card className="project_card">
                <Card.Header className="pchead">
                  <Card.Title>{pdetails[0].projectname}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {pdetails[0].description}
                  </Card.Text>
                </Card.Body>
              </Card> */}
              <Col>
                <h1>{pdetails[0].projectname}</h1>
              </Col>

            </Row>}

            {!error && <Row>
              <Col>
                <h5>{pdetails[0].description}</h5>
              </Col>
            </Row>}

            {!error && <Row>
              <Col><hr style={{ color: 'lightgray', marginTop: '0.5em' }} /></Col>
            </Row>}

            {!error && <Row className="mt-2 mb-2" >
              <div className="d-flex p-2 bd-highlight">
                <Col md={12}>
                  <Button className="mr-sm-2" variant="success" data-toggle="tooltip" title="Go to issues"
                    onClick={() => setisModelOpen(true)}>
                    <b>Add Issue</b></Button>
                  <Modal size="lg" show={isModelOpen}>
                    <Modal.Body>
                      <IssueForm cl={() => setisModelOpen(false)} project={pid} reload={() => fetchtickets()} />
                    </Modal.Body>

                  </Modal>

                </Col>
              </div>
            </Row>}

            {!error && <Row>
              <Col md-12>
                <MaterialTable
                  columns={[
                    { title: 'Id', field: 'id' },
                    { title: 'Title', field: 'issuename' },
                    { title: "Date", field: "date", },
                    { title: 'Priority', field: 'priority', render: rowData => <Badge variant={bagetype(rowData.priority)}>{rowData.priority}</Badge>, customSort: (a, b) => a.priorityid - b.priorityid },
                    { title: 'Severity', field: 'severity', render: rowData => <Badge variant={severitytype(rowData.severity)}>{rowData.severity}</Badge>, customSort: (a, b) => a.severityid - b.severityid }

                  ]}
                  data={buglist}
                  isLoading={isLoading}
                  title="Issues"
                  onRowClick={(event, rowData) => { tableticket(rowData.id) }}
                />

              </Col>

            </Row>}
          </Col>

          {error && <div>

            <Error message={message} />

          </div>}


        </div>
      </Row>
    </div>
  )


}


export default IssueBacklogBCL;