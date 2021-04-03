import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MaterialTable from "material-table";
import { Badge, BootstrapDialog, Button } from "react-bootstrap";
import { ticketService } from "../../../Services/TicketService";
import { authenticationService } from "../../../Services/LoginService";
import { Redirect } from "react-router-dom";
import { projectService } from "../../../Services/ProjectService";
//import { Tooltip } from "@material-ui/core";
//import {Example} from './BacklogFunctions';
import { backlogFunctions } from "./BacklogFunctions";
import { Modal } from "react-bootstrap";
import TicketView from "./TicketView";
import QATicketView from "./QATicketView";
import AddSprintModal from "./AddSprintModal";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

function IssueBacklogBMS() {
  /* const { projectid } = useParams();
  localStorage.setItem("projectID", JSON.stringify(projectid));
*/
  //actions

  var userRole = "Block";
  if (authenticationService.currentUserValue != null) {
    userRole = authenticationService.userRole;
  }

  const [state1, setState] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [isModelOpen, setisModelOpen] = useState(false);
  const [isQAModelOpen, setisQAModelOpen] = useState(false);
  const pid = projectService.getCurrentProject();
  const [isAddSprintOpen, setisAddSprintOpen] = useState(false);

  projectService.GetProject(pid).then(function (response) {
    //update the state1 as the current project name
    setState(response.data.projectname);
  });

  const { approvedBSPList } = ticketService.FetchBugsForApprovedBSP(pid); // for button disable
  const { bspList } = ticketService.FetchBugsForBSP(pid); // for button disable

  const { bmsList } = ticketService.FetchBugsForBMS(pid);
  const { filters } = ticketService.Filters();

  const PriorityBadge = (type) => {
    switch (type) {
      case "urgent":
        return "danger";
        break;

      case "high":
        return "warning";
        break;

      case "medium":
        return "success";
        break;

      case "low":
        return "primary";
        break;
    }
  };

  const SeverityBadge = (type) => {
    switch (type) {
      case "critical":
        return "danger";
        break;

      case "high":
        return "warning";
        break;

      case "medium":
        return "success";
        break;

      case "low":
        return "primary";
        break;
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
      lookup: { true: "Reviewed", false: "Not Reviewed" },
    },
    {
      title: "Status",
      field: "workstate",
      lookup: { 4: "Done", 3: "Review", 2: "In Progress", 1: "Open" },
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
        <Badge variant={SeverityBadge(row.severity)}>{row.severity}</Badge>
      ),
      lookup: filters.severity,
    },
    {
      title: "Priority",
      field: "priority",
      editable: true,
      render: (row) => (
        <Badge variant={PriorityBadge(row.priority)}>{row.priority}</Badge>
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
      <div></div>

      {userRole == "Manager" && (
        <MaterialTable
          icons={{
            Filter: () => (
              <div>
                <IoIcons.IoIosSearch />
              </div>
            ),
          }} // remove the default icon and pass the search icon
          title={state1}
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
            {
              icon: () => <i class="fas fa-plus-square"></i>,
              onClick: (event, rowData) => alert("Add to sprint"),
            },
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) => {
                setisModelOpen(true);
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
      {userRole == "Block" && <Redirect to="/error" />}
      {userRole == "Developer" && (
        <MaterialTable
          icons={{
            // remove the default icon and pass the search icon
            Filter: () => (
              <div>
                <IoIcons.IoIosSearch />
              </div>
            ),
          }}
          title={state1}
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
                backlogFunctions.addBugsToBSP(rowData, true, false),
              tooltip: "Add bugs to bsp",
              disabled:
                bspList.find((o) => o.id === rowData.id) ||
                approvedBSPList.find((o) => o.id === rowData.id),
            }),
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) => {setisModelOpen(true);setTicketData(rowData);},
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
          title={state1}
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
                backlogFunctions.addBugsToBSP(rowData, true, false),
              tooltip: "Add bugs to bsp",
              disabled:
                bspList.find((o) => o.id === rowData.id) ||
                approvedBSPList.find((o) => o.id === rowData.id),
            }),

            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) =>{setisQAModelOpen(true);setTicketData(rowData);},
              tooltip: "Ticket view",
            },
          ]}
        />
      )}
      <Modal size="lg" show={isModelOpen}>
        <Modal.Body>
          <TicketView cl={() => setisModelOpen(false)} data={ticketData} />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={isQAModelOpen}>
        <Modal.Body>
          <QATicketView cl={() => setisQAModelOpen(false)} data={ticketData} />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={isAddSprintOpen}>
        <Modal.Body>
          <AddSprintModal cl={() => setisAddSprintOpen(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default IssueBacklogBMS;
