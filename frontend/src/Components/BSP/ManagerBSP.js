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


export const ManagerbspService = {
  BSPlist,
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





// manager's approved level tickets
function BSPlist() {
  var userRole = "Block";
  if (authenticationService.currentUserValue != null) {
    userRole = authenticationService.userRole;
  }

  const [state1, setState] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [isModelOpen, setisModelOpen] = useState(false);

  const pid = projectService.getCurrentProject();

  projectService.GetProject(pid).then(function (response) {
    setState(response.data.projectname);   // update the state1 as current project name
  });

  const { bspList } = ticketService.FetchBugsForBSP(pid);
  const { filters } = ticketService.Filters();

  const columns = [
    {
      title: "Issuename",
      field: "issuename",
    },
    {
      title: "Review",
      field: "review",
      lookup: {true:"Reviewed",false:"Not Reviewed"},
    },
    {
      title: "Status",
      field: "workstate",
      lookup: {4:"Done",3:"Review",2:"In Progress",1:"Open"},
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
        icons={{ Filter: () => <div ><IoIcons.IoIosSearch/></div> }} // remove the default icon and pass the search icon
          title={state1}
          columns={columns}
          data={bspList}
          options={{
            sorting: true,
            filtering: true,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <IoIcons.IoIosCloseCircle />,
              onClick: (event, rowData) => backlogFunctions.addBugsToBSP(rowData,false,false), // approval -> false , bspStatus -> false
            },
            {
              icon: () => <IoIcons.IoIosCheckmarkCircleOutline />,
              onClick: (event, rowData) => backlogFunctions.addBugsToBSP(rowData,false,true), //approval -> True , bsp Status -> True
            },
            {
              icon: () => <IoIcons.IoIosOpen />,
              onClick: (event, rowData) => {setisModelOpen(true);setTicketData(rowData);},
              tooltip: "Ticket view",
            },
          ]}
        />
      )}
      {userRole == "Block" && <Redirect to="/error" />}
      <Modal size="lg" show={isModelOpen}>
        <Modal.Body>
          <TicketView cl={() => setisModelOpen(false)} data={ticketData} />
        </Modal.Body>
      </Modal>
      
    </div>
  );
}




