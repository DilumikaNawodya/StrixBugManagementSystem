import React, { useState } from "react"
import MaterialTable from 'material-table'
import projectdelete from '../../../Assets/delete.svg'
import { projectService } from "../../../Services/ProjectService";
import { Modal } from 'react-bootstrap';
import ProjectForm from "./ProjectForm";
import Swal from 'sweetalert2'
import ProjectDetailCard from "./ProjectDetails";

function Projects(){
    
  const {projects} = projectService.GetProjectList();

  const [showAddProject, setShowAddProject] = useState(false)
  const [showDeleteProject, setShowDeleteProject] = useState(false)
  const [showEditProject, setShowEditProject] = useState(false)

  const [tempDeleteID, settempDeleteID] = useState(null)
  const [tempEditID, settempEditID] = useState(null)

  // Project updating
  const editProjects = (id) => {
    settempEditID(id)
    editProjectModal()
  }

  const editProjectModal = () => {
    setShowEditProject(!showEditProject)
  }

  // Project Deletion
  const deleteProjects = (id) => {
    settempDeleteID(id)
    deleteProjectModal()
  }
  
  const deleteProjectConfirm = () => {
    deleteProjectModal()

    projectService.DeleteProject(tempDeleteID)
      .then(function (response) {
        Swal.fire({
          position: 'middle',
          icon: 'success',
          title: response.data.data,
          showConfirmButton: true,
          timer: 5000
        }).then(function () {
          window.location = "/projects";
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
          window.location = "/projects";
        })
      })

  }

  const deleteProjectModal = () => {
    setShowDeleteProject(!showDeleteProject)
  }


  // Project Creation
  const addProject = () => {
    setShowAddProject(!showAddProject)
  }



  return (
    <>
    <div class="container-fluid mt-4">
      <MaterialTable
        title="Projects"
        columns={[
          {
            title: 'Project ID', 
            field: 'id', 
            render: rowData => "Project - " + rowData.id
          },
          { title: 'Project Name', field: 'projectname'},
          { 
            title: 'Project Description', 
            field: 'description', 
            render: rowData => <div class="overflow-auto">{rowData.description}</div>   
          }
        ]}
        data={projects}        
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 100}
        }}
        actions={[
          {
            icon: () => <i class="fas fa-edit success"></i>,
            onClick: (event, rowData) => editProjects(rowData.id)
          },
          {
            icon: () => <i class="fas fa-trash-alt"></i>,
            onClick: (event, rowData) => deleteProjects(rowData.id)
          },
          {
            icon: () => <i class="fas fa-plus-square"></i>,
            isFreeAction: true ,
            onClick: () => addProject()
          },
        ]}
        detailPanel={rowData=>{
          return(<ProjectDetailCard data={rowData}/>)
        }}
      />
    </div>

      <Modal show={showAddProject}>
        <Modal.Body class="container">
          <ProjectForm pid={0}/>
          <button type="button" className="btnContact mb-4" onClick={addProject}>Cancel</button>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteProject}>
        <Modal.Body class="container">
          <div class="contact-form">
            <div class="contact-image">
              <img src={projectdelete} alt="rocket_contact" width="100px" height="100px" />
            </div>
            <h3 class="ml-2 font-weight-lighter" style={{ marginTop: "-8rem", textAlign: "left" }}>Are you sure you want<br />to delete this Project ?</h3>
          </div>
          <button type="button" className="btnContact mb-4" onClick={deleteProjectConfirm}>Confirm</button>
          <button type="button" className="btnContact mb-4" onClick={deleteProjectModal}>Cancel</button>
        </Modal.Body>
      </Modal>

      <Modal show={showEditProject}>
        <Modal.Body class="container">
          <ProjectForm pid={tempEditID}/>
          <button type="button" className="btnContact mb-4" onClick={editProjectModal}>Cancel</button>
        </Modal.Body>
      </Modal>

    </>
  )

}


export default Projects;
