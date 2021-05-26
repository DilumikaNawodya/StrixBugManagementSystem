import React, { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import MaterialTable from "material-table";
import { Badge } from "react-bootstrap";
import { ticketService } from "../../Services/TicketService";
import { projectService } from "../../Services/ProjectService";
import { authenticationService } from "../../Services/LoginService";
import Swal from 'sweetalert2'
import { Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TicketViewNew from "../BMS/IssueBacklog/TicketViewUpdate";
import Preloader from "../Common/Preloader/Preloader";
import Error from "../Common/Errors/Error";

// Bug Solution Pool for Managers, Developers, QA

function BSPlistApproved() {

  var userRole = "Block"

  if (authenticationService.currentUserValue != null) {
    userRole = authenticationService.userRole
  }

  const [projectname, setProjectName] = useState('')
  const [ticketData, setTicketData] = useState()

  const [isManagerModelOpen, setisManagerModelOpen] = useState(false)
  const [isOtherModelOpen, setisOtherModelOpen] = useState(false)

  const pid = projectService.getCurrentProject()

  useEffect(() => {
    projectService.GetProject(pid)
      .then(function (response) {
        setProjectName(response.data.projectname)
      })
  }, [])

  const { BSPList, loading, error, message } = ticketService.FetchBugsForBSP(pid, 1)
  const { filters } = ticketService.Filters()

  const columns = [
    {
      title: "Issuename",
      field: "issuename",
    },
    {
      title: "Review",
      field: "review",
      lookup: filters.review,
    },
    {
      title: "Status",
      field: "Workstate.id",
      lookup: filters.status,
    },
    {
      title: "Bugtype",
      field: "BugType.id",
      lookup: filters.bugtype,
    },
    {
      title: "Severity",
      field: "Severity.id",
      render: (row) => (
        <Badge variant={row.Severity.color}> {row.Severity.severity} </Badge>
      ),
      lookup: filters.severity,
    },
    {
      title: "Priority",
      field: "Priority.id",
      editable: true,
      render: (row) => (
        <Badge variant={row.Priority.color}> {row.Priority.priority}</Badge>
      ),
      lookup: filters.priority,
    },
    {
      title: "Date",
      field: "date",
    },
  ]


  return (
    <div class="container-fluid mt-4">

      {!error && userRole == "Manager" && (
        <MaterialTable
          icons={{
            Filter: () => (
              <div>
                <IoIcons.IoIosSearch />
              </div>
            ),
          }}
          title={projectname}
          columns={columns}
          data={BSPList}
          options={{
            sorting: true,
            filtering: true,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <IoIcons.IoMdTrash />,
              onClick: (event, rowData) => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You are about to Accept this issue",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes'
                }).then((result) => {
                  if (result.isConfirmed) {
                    ticketService.StateChange(rowData, false, false)
                      .then(function (response) {
                        Swal.fire({
                          position: 'middle',
                          icon: 'success',
                          title: response.data.data,
                          showConfirmButton: true,
                          timer: 5000
                        }).then(function () {
                          window.location.reload(true)
                        })
                      })
                      .catch(function (error) {
                        Swal.fire({
                          position: 'middle',
                          icon: 'warning',
                          title: error.response.data.data,
                          showConfirmButton: true,
                          timer: 5000
                        }).then(function () {
                          window.location.reload(true)
                        })
                      })
                  }
                })
              }
            },
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) => {
                setisManagerModelOpen(true)
                setTicketData(rowData)
              },
              tooltip: "Ticket view",
            },
          ]}
        />
      )}


      {!error && userRole != "Manager" && userRole != "Block" && (
        <MaterialTable
          icons={{
            Filter: () => (
              <div>
                <IoIcons.IoIosSearch />
              </div>
            ),
          }} // remove the default icon and pass the search icon
          title={projectname}
          columns={columns}
          data={BSPList}
          options={{
            sorting: true,
            filtering: true,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) => {
                setisOtherModelOpen(true)
                setTicketData(rowData)
              },
              tooltip: "Ticket view",
            },
          ]}
        />
      )}

      {userRole == "Block" && <Redirect to="/error" />}

      <Modal size="lg" show={isManagerModelOpen}>
        <Modal.Body>
          <TicketViewNew cl={() => setisManagerModelOpen(false)} data={ticketData} role="None" />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={isOtherModelOpen}>
        <Modal.Body>
          <TicketViewNew cl={() => setisOtherModelOpen(false)} data={ticketData} role="None" />
        </Modal.Body>
      </Modal>

      { loading && <div>

        <Preloader />

      </div>}

      { error && <div>

        {
          <Error message={message} />
        }

      </div>}

    </div>
  )
}


export default BSPlistApproved