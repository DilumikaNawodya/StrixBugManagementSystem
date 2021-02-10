import React, { useEffect, useState } from "react"
import { userService } from "../../../Services/UserService"
import MaterialTable from 'material-table'


function UserTableInternal(){

  const { internalusers } = userService.GetInternalUserList();

  return (
    <>
      <div class="container-fluid mt-4">
        <MaterialTable
          title="Internal Users"
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
          data={internalusers}
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


export default UserTableInternal;
