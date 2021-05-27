import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { projectService } from "../../../Services/ProjectService";
import { sprintService } from "../../../Services/SprintService";
import Badge from "react-bootstrap/Badge";
import { Fragment } from "react";
import * as AiIcons from "react-icons/ai";
import MaterialTable from "material-table";
import Preloader from "../../Common/Preloader/Preloader";
import Error from "../../Common/Errors/Error";

function SprintBacklog() {

  const history = useHistory()

  const [projectName, setProjectName] = useState(null)
  const pid = projectService.getCurrentProject()

  useEffect(() => {
    projectService.GetProject(pid)
      .then(function (response) {
        setProjectName(response.data.projectname)
      })
  }, [])

  const { sprints, loading, error, message } = sprintService.GetSprintList(pid)
  const pinnedSprints = JSON.parse(sprintService.getPinnedSprints())

  const launchKanban = (sid) => {
    history.push("/kanbanboard/" + sid)
  }


  function handlePin(id) {
    sprintService.ChangePin(id)
  }

  const data = [
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
  ]


  return (
    <Fragment>
      {!error && <div class="mt-4 mr-4 ml-4 mb-4">
        <MaterialTable
          title={projectName}
          data={sprints}
          columns={data}
          options={{
            sorting: true,
          }}
          options={{
            actionsColumnIndex: -1,
          }}
          actions={[
            (rowData) => (
              {
                icon: () => pinnedSprints.some(sprint => sprint.sprint_id == rowData.id) ? <AiIcons.AiFillPushpin /> : <AiIcons.AiOutlinePushpin />,
                onClick: (event) => handlePin(rowData.id),
                disabled: rowData.status == false,
              }
            ),
            (rowData) => (
              {
                icon: () => <i class="fas fa-external-link-alt"></i>,
                onClick: () => launchKanban(rowData.id),
              }
            )
          ]}
        />
      </div>}
      { loading && <div>

        <Preloader />

      </div>}

      { error && <div>

        {
          <Error message={message} />
        }

      </div>}
    </Fragment>
  );
}

export default SprintBacklog;
