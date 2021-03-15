import React, { useState } from "react"
import { userService } from "../../../Services/UserService"
import MaterialTable from 'material-table'
import ExternalUserForm from "./ExternalUserForm"
import { Modal } from 'react-bootstrap';

function UserTableExternal(){
    
  const {externalusers} = userService.GetExternalUserList()
  const [showAddUser, setShowAddUser] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)
  const [tempID, settempID] = useState(null)


  const editExternalUsers = (id) =>{
    alert(id)
  }

  const deleteExternalUsers = (id) =>{
    settempID(id)
    deleteUserModal()
  }

  const deleteUserConfirm = () =>{
    deleteUserModal()
    console.log(tempID)
  }

  const deleteUserModal = () => {
    setShowDeleteUser(!showDeleteUser)
  }

  const addExternalUser = () => {
    setShowAddUser(!showAddUser)
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

      <Modal show={showAddUser}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <ExternalUserForm/>
          <button type="button" className="btn btn-dark mb-3 btn-block" onClick={addExternalUser}>Cancel</button>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteUser}>
        <Modal.Header>
          <i class="far fa-frown"></i>
        </Modal.Header>
        <Modal.Body>
          <h3 class="ml-2 font-weight-lighter mb-5">Are you sure you want to delete this user ?</h3>
          <button type="button" className="btn btn-dark ml-3" onClick={deleteUserConfirm}>Confirm</button>
          <button type="button" className="btn btn-dark ml-3" onClick={deleteUserModal}>Cancel</button>
        </Modal.Body>
      </Modal>

    </>
  )

}


export default UserTableExternal;
