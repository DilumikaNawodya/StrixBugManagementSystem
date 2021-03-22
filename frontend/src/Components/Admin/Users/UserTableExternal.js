import React, { useState } from "react"
import { userService } from "../../../Services/UserService"
import MaterialTable from 'material-table'
import ExternalUserForm from "./ExternalUserForm"
import userdelete from '../../../Assets/delete.svg'
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'


function UserTableExternal() {

  const { externalusers } = userService.GetExternalUserList()

  const [showAddUser, setShowAddUser] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)

  const [tempDeleteID, settempDeleteID] = useState(null)
  const [tempEditID, settempEditID] = useState(null)

  // User updating
  const editExternalUsers = (id) => {
    settempEditID(id)
    editUserModal()
  }

  const editUserModal = () => {
    setShowEditUser(!showEditUser)
  }

  // User Deletion
  const deleteExternalUsers = (id) => {
    settempDeleteID(id)
    deleteUserModal()
  }
  
  const deleteUserConfirm = () => {
    deleteUserModal()

    userService.DeleteExternalUser(tempDeleteID)
      .then(function (response) {
        Swal.fire({
          position: 'middle',
          icon: 'success',
          title: response.data.data,
          showConfirmButton: true,
          timer: 5000
        }).then(function () {
          window.location = "/externalusers";
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
          window.location = "/externalusers";
        })
      })

  }

  const deleteUserModal = () => {
    setShowDeleteUser(!showDeleteUser)
  }


  // User Creation
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
            { title: 'Email', field: 'email', type: 'email' },
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
              isFreeAction: true,
              onClick: () => addExternalUser()
            },
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </div>

      <Modal show={showAddUser}>
        <Modal.Body class="container">
          <ExternalUserForm uid={0}/>
          <button type="button" className="btnContact mb-4" onClick={addExternalUser}>Cancel</button>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteUser}>
        <Modal.Body class="container">
          <div class="contact-form">
            <div class="contact-image">
              <img src={userdelete} alt="rocket_contact" width="100px" height="100px" />
            </div>
            <h3 class="ml-2 font-weight-lighter" style={{ marginTop: "-8rem", textAlign: "left" }}>Are you sure you want<br />to delete this user ?</h3>
          </div>
          <button type="button" className="btnContact mb-4" onClick={deleteUserConfirm}>Confirm</button>
          <button type="button" className="btnContact mb-4" onClick={deleteUserModal}>Cancel</button>
        </Modal.Body>
      </Modal>

      <Modal show={showEditUser}>
        <Modal.Body class="container">
          <ExternalUserForm uid={tempEditID}/>
          <button type="button" className="btnContact mb-4" onClick={editUserModal}>Cancel</button>
        </Modal.Body>
      </Modal>

    </>
  )

}


export default UserTableExternal;
