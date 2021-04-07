import API from "./Base";
import { useEffect, useState } from "react";
import { projectService } from "./ProjectService";
import Swal from 'sweetalert2'

export const sprintService = {
  GetSprintList,
  CreateSprint,

  GetPinnedSprintsList,
  ChangePin,

  removePinnedSprints,
  setPinnedSprints,
  getPinnedSprints,

  GetKanbanTasks,
  UpdateWorkstate,

}

function GetSprintList(pid) {
    const [state, setState] = useState({
      sprints: [],
      loading: true,
      error: false,
    });
    useEffect(() => {
      API.get("/sprintlist/?pid="+pid)
        .then(function (response) {
          setState({
            sprints: response.data,
            loading: false,
            error: false,
          })
        })
        .catch(function (error) {
          setState({
            sprints: [],
            loading: false,
            error: true,
          })
        })
    }, [])

  return state;
}

function CreateSprint(sprintname, enddate, project) {
  const request = API.post("/sprintlist/",{
    sprintname: sprintname,
    enddate: enddate,
    project: project
  })
  return request
}


function GetPinnedSprintsList(pid){
  const request = API.get("/pinnedsprintlist/?pid="+pid)
  return request
}

function ChangePin(id){
  API.patch('/pinnedsprintlist/'+id+'/',{})
    .then(function (response){
      GetPinnedSprintsList(projectService.getCurrentProject())
      .then(function (response){
        setPinnedSprints(response.data)
      })
      .then(function (response) {
          Swal.fire({
              position: 'middle',
              icon: 'success',
              title: "Succefully Changed",
              showConfirmButton: true,
              timer: 5000
          }).then(function () {
              window.location = '/sprintbacklog'
          })
      })
      .catch(function (error) {
          Swal.fire({
              position: 'middle',
              icon: 'warning',
              title: "Error Occured",
              showConfirmButton: true,
              timer: 5000
          }).then(function () {
              window.location = '/sprintbacklog'
          })
      })
    })
}

function GetKanbanTasks(sid, type){
  const request = API.get('/kanbantickets/?sid='+sid+'&type='+type)
  return request
}

function UpdateWorkstate(dropdetails){
  API.patch('/kanbantickets/'+ dropdetails.tid +'/',{
    destid: dropdetails.destid
  })
}

/////////////////////////////////////////////////////

function removePinnedSprints(){
  localStorage.removeItem('pinnedsprints')
}

function setPinnedSprints(pinnedsprints){
  localStorage.setItem('pinnedsprints', JSON.stringify(pinnedsprints))
}

function getPinnedSprints(){
  return localStorage.getItem('pinnedsprints')
}