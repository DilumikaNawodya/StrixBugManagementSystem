import React, { useEffect, useState } from "react"
import { userService } from "../../../Services/UserService"
import MaterialTable ,{ MTableToolbar } from 'material-table'
import ExternalUserForm from "./ExternalUserForm"

function UserTableExternal(){
    
  const {externalusers} = userService.GetExternalUserList()
  const [state, setState] = useState(false)


  const editExternalUsers = (id) =>{
    alert(id)
  }

  const deleteExternalUsers = (id) =>{
    alert(id)
  }

  const addExternalUser = () => {
    setState(true)
  }


  return (
    <>
    <div class="container-fluid mt-4">
      <MaterialTable
        title="External Users"
        columns={[
          {
            title: 'Name', 
            field: 'first_name', 
            render: rowData => rowData.first_name + " " + rowData.last_name
          },
          { title: 'Date Joined', field: 'date_joined', type: 'date' },
          { 
            title: 'Role', 
            field: 'role', 
            render: rowData => <span class={"badge badge-" + rowData.color}>{rowData.role}</span>
          }
        ]}
        data={externalusers}        
        options={{
          sorting: true
        }}
        actions={[
            {
              icon: () => <i class="fas fa-edit success"></i>,
              onClick: (event, rowData) => editExternalUsers(rowData.id)
            },
            {
              icon: () => <i class="fas fa-trash-alt"></i>,
              onClick: (event, rowData) => deleteExternalUsers(rowData.id)
            },
            {
              icon: () => <i class="fas fa-plus-square"></i>,
              isFreeAction: true ,
              onClick: () => addExternalUser()
            },
        ]}
        options={{
            actionsColumnIndex: -1
        }}
      />
    </div>

    <ExternalUserForm handleOpen={state}/>

    </>
  )

}


export default UserTableExternal;
