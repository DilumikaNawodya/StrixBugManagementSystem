import API from "./Base";
import { useEffect, useState } from "react";

export const sprintService = {
  GetSprintList,
  CreateSprint,
};

function GetSprintList(params, pid) {
  const [state, setState] = useState({
    sprints: [],
    loading: true,
    error: false,
  });
  useEffect(() => {
    API.post("sprintlist/", {
      pid: pid,
    })
      .then(function (response) {
        setState({
          sprints: response.data.Sprints,
          loading: false,
          error: false,
        });
      })
      .catch(function (error) {
        setState({
          sprints: [],
          loading: false,
          error: true,
        });
      });
  }, []);

  return state;
}

// function CreateSprint(params, user) {
//   fetch("createsprint/");
// }

function CreateSprint(user) {
  API.post("createsprint/");
}
