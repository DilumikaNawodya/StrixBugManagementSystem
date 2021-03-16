import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { projectService } from "../../../Services/ProjectService";
import { sprintService } from "../../../Services/SprintService";
import Badge from "react-bootstrap/Badge";
import { BehaviorSubject } from "rxjs";
import { Fragment } from "react";
import MaterialTable from "material-table";

const projectID = new BehaviorSubject(
  JSON.parse(localStorage.getItem("projectID"))
);

function SprintBacklog() {
  const [params, setParams] = useState({});
  const history = useHistory();

  const handleInput = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  const { sprints, loading, error } = sprintService.GetSprintList(
    params,
    projectID.value
  );

  const launchKanban = () => {
    history.push("/kanbanboard");
  };

  const pinnedSprint = () => {
    console.log("pinned");
  };

  return (
    <Fragment>
      <div class="mt-4 mr-4 ml-4 mb-4">
        <MaterialTable
          title="Sprint Backlog"
          columns={[
            {
              title: "Sprint ID",
              field: "id",
              editable: "never",
            },
            {
              title: "Sprint Name",
              field: "name",
              editable: "onUpdate",
            },
            {
              title: "Status",
              field: "status",
              editable: "onUpdate",
              render: (rowData) => (
                <Badge variant={rowData.status ? "success" : "danger"}>
                  {rowData.status ? "Active" : "Inactive"}
                </Badge>
              ),
            },
          ]}
          data={sprints}
          options={{
            sorting: true,
          }}
          options={{
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <i class="fas fa-external-link-alt"></i>,
              onClick: () => launchKanban(),
            },
            {
              icon: (rowData) => (
                <i
                  class="fas fa-thumbtack"
                  style={{ color: rowData.status ? "black" : "lightgrey" }}
                ></i>
              ),
              onClick: (event) => pinnedSprint(),
            },
          ]}
        />
      </div>
    </Fragment>
  );
}

export default SprintBacklog;
