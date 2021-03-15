import React, { useEffect, useState } from "react"
import MaterialTable from 'material-table'
import { projectService } from "../../../Services/ProjectService";

function Projects(){
    
  const {projects} = projectService.GetProjectList();
  const [state, setState] = useState(false)
  
  const editProjects = (id) =>{
    alert(id)
  }

  const deleteProjects = (id) =>{
    alert(id)
  }

  const addProjects = () => {
    setState(true)
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
          sorting: true
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
            onClick: () => addProjects()
          },
        ]}
        options={{
            actionsColumnIndex: -1
        }}
      />
    </div>
    </>
  )

}


export default Projects;
