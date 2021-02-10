import React, { useEffect, useState } from "react"
import MaterialTable from 'material-table'
import { projectService } from "../../../Services/ProjectService";

function Projects(){
    
  const {projects} = projectService.GetProjectList();

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
              icon: () => <button class="btn btn-sm btn-outline-warning"><i class="fas fa-edit fa-2x"></i></button>,
              onClick: (event, rowData) => alert("You edited " + rowData.id)
            },
            {
                icon: () => <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash-alt fa-2x"></i></button>,
                onClick: (event, rowData) => alert("You deleted " + rowData.id)
            }
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
