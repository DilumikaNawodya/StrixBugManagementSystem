import React, { useState } from "react";
import MaterialTable from "material-table";
import { Badge } from "react-bootstrap";
import { ticketService } from "../../../Services/TicketService";
import * as IoIcons from "react-icons/io";
import { authenticationService } from "../../../Services/LoginService";
import { Redirect } from "react-router-dom";
import { projectService } from "../../../Services/ProjectService";
import TicketView from "./TicketView";
import { Modal } from "react-bootstrap";
import AddSprintModal from "./AddSprintModal";

function IssueBacklogBMS() {
  var userRole = "Block";
  if (authenticationService.currentUserValue != null) {
    userRole = authenticationService.userRole;
  }

  const [state, setState] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [isModelOpen, setisModelOpen] = useState(false);
  const [isAddSprintOpen, setisAddSprintOpen] = useState(false);
  const pid = projectService.getCurrentProject();
  projectService.GetProject(pid).then(function (response) {
    setState(response.data.projectname);
  });

  const { bugs } = ticketService.useFetchBugs(1);
  const { filters } = ticketService.Filters();

  const BadgeColor = (type) => {
    switch (type) {
      case "high":
        return "warning";
        break;

      case "medium":
        return "success";
        break;

      case "low":
        return "primary";
        break;

      default:
        return "danger";
    }
  };

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
      field: "workstate",

      lookup: filters.status,
    },
    {
      title: "Bugtype",
      field: "bugtype",

      lookup: filters.bugtype,
    },
    {
      title: "Severity",
      field: "severity",

      render: (row) => (
        <Badge variant={BadgeColor(row.severity)}>{row.severity}</Badge>
      ),
      lookup: filters.severity,
    },
    {
      title: "Priority",
      field: "priority",

      render: (row) => (
        <Badge variant={BadgeColor(row.priority)}>{row.priority}</Badge>
      ),
      lookup: filters.priority,
    },
    {
      title: "Date",
      field: "date",
    },
  ];

  return (
    <>
      <div class="container-fluid mt-4">
        {userRole == "Manager" && (
          <MaterialTable
            title={state}
            columns={columns}
            data={bugs}
            options={{
              sorting: true,
              filtering: true,
              actionsColumnIndex: -1,
            }}
            actions={[
              {
                icon: () => <IoIcons.IoMdOpen />,
                onClick: (e, rowData) => {
                  setisModelOpen(true);
                  setTicketData(rowData);
                },
              },
              {
                icon: () => <i class="fas fa-plus-square"></i>,
                onClick: (event, rowData) => console.log(rowData),
              },
              {
                icon: () => (
                  <button class="btn btn-sm btn-dark">Add Sprint</button>
                ),
                isFreeAction: true,
                onClick: () => setisAddSprintOpen(true),
              },
            ]}
          />
        )}
        {userRole == "Block" && <Redirect to="/error" />}
        {userRole != "Manager" && userRole != "Block" && (
          <MaterialTable
            title={state}
            columns={columns}
            data={bugs}
            options={{
              sorting: true,
              filtering: true,
              actionsColumnIndex: -1,
            }}
            actions={[
              {
                icon: () => <IoIcons.IoMdOpen />,
                onClick: () => setisModelOpen(true),
              },
              {
                icon: () => <IoIcons.IoMdArchive />,
                onClick: (event, rowData) => console.log(rowData),
              },
            ]}
          />
        )}
      </div>
      <Modal size="lg" show={isModelOpen}>
        <Modal.Body>
          <TicketView cl={() => setisModelOpen(false)} data={ticketData} />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={isAddSprintOpen}>
        <Modal.Body>
          <AddSprintModal cl={() => setisAddSprintOpen(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default IssueBacklogBMS;
