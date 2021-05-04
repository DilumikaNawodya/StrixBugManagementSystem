import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Badge } from "react-bootstrap";
import { ticketService } from "../../../Services/TicketService";
import { authenticationService } from "../../../Services/LoginService";
import { Redirect } from "react-router-dom";
import { projectService } from "../../../Services/ProjectService";
import { Modal } from "react-bootstrap";
import AddSprintModal from "./AddSprintModal";
import AddToSprintModal from "./AddToSprintModal";
import * as IoIcons from "react-icons/io";
import TicketView from "./TicketViewUpdate";
import Swal from "sweetalert2";
import { sprintService } from "../../../Services/SprintService";

function IssueBacklogBMS() {
  var userRole = "Block";
  if (authenticationService.currentUserValue != null) {
    userRole = authenticationService.userRole;
  }

  const [projectname, setProjectName] = useState("");
  const [ticketData, setTicketData] = useState();

  const [isAddToSprintOpen, setisAddToSprintOpen] = useState(false);
  const [isManagerModelOpen, setisManagerModelOpen] = useState(false);
  const [isQAModelOpen, setisQAModelOpen] = useState(false);
  const [isDevModelOpen, setisDevModelOpen] = useState(false);

  const [isAddSprintOpen, setisAddSprintOpen] = useState(false);

  const pid = projectService.getCurrentProject();

  useEffect(() => {
    projectService.GetProject(pid).then(function (response) {
      setProjectName(response.data.projectname);
    });
  }, []);


  const { bmsList } = ticketService.FetchBugs(pid);
  
  let ticketlist = [];
  const { sprints } = sprintService.GetSprintList(pid);
  for (var i = 0; i < sprints.length; i++) {
    ticketlist = ticketlist.concat(sprints[i].ticketlist);
  }

  const { filters } = ticketService.Filters();

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
  ];

  return (
    <div class="container-fluid mt-4">
      {userRole == "Manager" && (
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
          data={bmsList}
          options={{
            sorting: true,
            filtering: true,
            actionsColumnIndex: -1,
          }}
          localization={{
            header: {
              actions: "",
            },
          }}
          actions={[
            (rowData) => ({
              icon: () => <i class="fas fa-plus-square"></i>,
              onClick: (e, rowData) => {
                setisAddToSprintOpen(true);
                setTicketData(rowData);
              },
              disabled: ticketlist.some((sprint) => sprint == rowData.id),
            }),
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) => {
                setisManagerModelOpen(true);
                setTicketData(rowData);
              },
              tooltip: "Ticket view",
            },
            {
              icon: () => (
                <button class="btn btn-sm btn-dark">Create Sprint</button>
              ),
              isFreeAction: true,
              onClick: () => setisAddSprintOpen(true),
            },
          ]}
        />
      )}

      {userRole == "Developer" && (
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
          data={bmsList}
          options={{
            sorting: true,
            filtering: true,
            actionsColumnIndex: -1,
          }}
          actions={[
            (rowData) => ({
              icon: () => <IoIcons.IoIosDownload />,
              onClick: (event, rowData) =>
                ticketService
                  .StateChange(rowData, true, false)
                  .then(function (response) {
                    Swal.fire({
                      position: "middle",
                      icon: "success",
                      title: response.data.data,
                      showConfirmButton: true,
                      timer: 5000,
                    }).then(function () {
                      window.location.reload(true);
                    });
                  })
                  .catch(function (error) {
                    Swal.fire({
                      position: "middle",
                      icon: "warning",
                      title: error.response.data.data,
                      showConfirmButton: true,
                      timer: 5000,
                    }).then(function () {
                      window.location.reload(true);
                    });
                  }),
              tooltip: "Add bugs to bsp",
              disabled: rowData.bspstatus == true || rowData.approval == true,
            }),
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) => {
                setisDevModelOpen(true);
                setTicketData(rowData);
              },
              tooltip: "Ticket view",
            },
          ]}
        />
      )}

      {userRole == "QA" && (
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
          data={bmsList}
          options={{
            Tooltip: false,
            sorting: true,
            filtering: true,
            actionsColumnIndex: -1,
          }}
          localization={{
            header: {
              actions: "",
            },
          }}
          actions={[
            (rowData) => ({
              icon: () => <IoIcons.IoIosDownload />,
              onClick: (event, rowData) =>
                ticketService
                  .StateChange(rowData, true, false)
                  .then(function (response) {
                    Swal.fire({
                      position: "middle",
                      icon: "success",
                      title: response.data.data,
                      showConfirmButton: true,
                      timer: 5000,
                    }).then(function () {
                      window.location.reload(true);
                    });
                  })
                  .catch(function (error) {
                    Swal.fire({
                      position: "middle",
                      icon: "warning",
                      title: error.response.data.data,
                      showConfirmButton: true,
                      timer: 5000,
                    }).then(function () {
                      window.location.reload(true);
                    });
                  }),
              tooltip: "Add bugs to bsp",
              disabled: rowData.bspstatus == true || rowData.approval == true,
            }),
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) => {
                setTicketData(rowData);
                setisQAModelOpen(true);
              },
              tooltip: "Ticket view",
            },
          ]}
        />
      )}

      {userRole == "Block" && <Redirect to="/error" />}

      <Modal size="lg" show={isManagerModelOpen}>
        <Modal.Body>
          <TicketView
            cl={() => setisManagerModelOpen(false)}
            data={ticketData}
            role="Manager"
          />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={isQAModelOpen}>
        <Modal.Body>
          <TicketView
            cl={() => setisQAModelOpen(false)}
            data={ticketData}
            role="QA"
          />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={isDevModelOpen}>
        <Modal.Body>
          <TicketView
            cl={() => setisDevModelOpen(false)}
            data={ticketData}
            role="Developer"
          />
        </Modal.Body>
      </Modal>
      <Modal size="md" show={isAddSprintOpen}>
        <Modal.Body>
          <AddSprintModal cl={() => setisAddSprintOpen(false)} />
        </Modal.Body>
      </Modal>
      <Modal size="sm" show={isAddToSprintOpen}>
        <Modal.Body>
          <AddToSprintModal
            cl={() => setisAddToSprintOpen(false)}
            data={ticketData}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default IssueBacklogBMS;
