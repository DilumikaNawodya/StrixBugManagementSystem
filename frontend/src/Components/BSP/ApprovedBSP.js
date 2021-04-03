import React, { useReducer, useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import MaterialTable from "material-table";
import { Badge } from "react-bootstrap";
import { ticketService } from "../../Services/TicketService";
import { projectService } from "../../Services/ProjectService";
import { authenticationService } from "../../Services/LoginService";

import { Redirect } from "react-router-dom";
import { backlogFunctions } from "../BMS/IssueBacklog/BacklogFunctions";
import { Modal } from "react-bootstrap";
import TicketView from "../BMS/IssueBacklog/TicketView"

export const bspService = {
    BSPlistApproved,
    
  };


const PriorityBadge = (type) => {
  switch (type) {
    case "urgent":
      return "danger";
      break;

    case "high":
      return "warning";
      break;

    case "medium":
      return "primary";
      break;

    case "low":
      return "success";
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
      return "primary";
      break;

    case "low":
      return "success";
      break;
  }
};
                                                           // Bug Solution Pool for Managers, Developers, QA
function BSPlistApproved() {
  var userRole = "Block";
  if (authenticationService.currentUserValue != null) {
    userRole = authenticationService.userRole;
  }

  const [state1, setState] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [isModelOpen, setisModelOpen] = useState(false);

  const pid = projectService.getCurrentProject();
  projectService.GetProject(pid).then(function (response) {
    setState(response.data.projectname);
  });

  const { approvedBSPList } = ticketService.FetchBugsForApprovedBSP(pid);
  const { filters } = ticketService.Filters();

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
          data={approvedBSPList}
          options={{
            sorting: true,
            filtering: true,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <IoIcons.IoMdTrash />,
              onClick: (event, rowData) => backlogFunctions.addBugsToBSP(rowData,false,false), // approval -> false and remove from the BSP
            },
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) =>{setisModelOpen(true);setTicketData(rowData);},
              tooltip: "Ticket view",
            },
          ]}
        />
      )}
      {userRole == "Block" && <Redirect to="/error" />}

      {userRole != "Manager" && userRole != "Block" && (
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
          data={approvedBSPList}
          options={{
            sorting: true,
            filtering: true,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) =>{setisModelOpen(true);setTicketData(rowData);},
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
    </div>
  );
}



/*
{userRole == "QA" && (
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
          data={approvedBSPList}
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
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) =>alert("ticket view"),
              tooltip: "Ticket view",
            },
          ]}
        />
      )}
      */