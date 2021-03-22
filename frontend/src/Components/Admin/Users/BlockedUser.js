import React, { useState } from "react"
import { userService } from "../../../Services/UserService"
import MaterialTable from 'material-table'
import { Modal } from 'react-bootstrap';
import BlockedUserForm from "./BlockedUserForm";


function UserTableBlocked(){

  const { blockedusers } = userService.GetBlockedUserList()

  const [showEditUser, setShowEditUser] = useState(false)
  const [tempEditID, settempEditID] = useState(null)

  // User updating
  const editBlockedlUsers = (id) => {
    settempEditID(id)
    editUserModal()
  }

  const editUserModal = () => {
    setShowEditUser(!showEditUser)
  }


  return (
    <>
      <div class="container-fluid mt-4">
        <MaterialTable
          title="Blocked Users"
          columns={[
            {
              title: 'Name',
              field: 'first_name',
              render: rowData => rowData.first_name + " " + rowData.last_name
            },
            { title: 'Email', field: 'email', type: 'email' },
            { title: 'Date Joined', field: 'date_joined', type: 'date' },
            {
              title: 'Previous Role',
              field: 'prev_role',
              render: rowData => <span class={"badge badge-" + rowData.prev_role_color}>{rowData.prev_role}</span>
            },
            {
              title: 'Role',
              field: 'role_color',
              render: rowData => <span class={"badge badge-" + rowData.role_color}>{rowData.role}</span>
            }
          ]}
          data={blockedusers}
          options={{
            sorting: true
          }}
          actions={[
            {
              icon: () => <i class="fas fa-edit success"></i>,
              onClick: (event, rowData) => editBlockedlUsers(rowData.id)
            }
          ]}
          options={{
              actionsColumnIndex: -1
          }}
        />
      </div>


      
      <Modal show={showEditUser}>
        <Modal.Body class="container">
          <BlockedUserForm uid={tempEditID} />
          <button type="button" className="btnContact mb-4" onClick={editUserModal}>Cancel</button>
        </Modal.Body>
      </Modal>


    </>
  )

}


export default UserTableBlocked;
