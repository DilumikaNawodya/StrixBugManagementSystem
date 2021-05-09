import React, { useState } from "react"
import { projectService } from "../../../Services/ProjectService"
import { Modal } from 'react-bootstrap';
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import Swal from 'sweetalert2'

function AccessControl(){

    const [modalOpen, setModalOpen] = useState(false)
    const [select, setSelect] = useState([])
    const [update, setUpdate] = useState([])

    
    const pid = projectService.getCurrentProject()
    const {alluserlist, error1} = projectService.GetAllUserList(pid)
    const {projectname, userlist, error} = projectService.GetAccessList(pid)
    

    const modalHandle = () => {
        setModalOpen(!modalOpen)
    }

    const handleSelect = (id) => {
        document.getElementById("btn-select"+id).innerHTML = 'Added'
        var Btn = document.getElementById("btn-select"+id)
        Btn.disabled = true
        setSelect([...select, id])
    }

    const handleSelectUndo = (id) => {
        document.getElementById("btn-select"+id).innerHTML = "<i class='fas fa-plus-square'></i>"
        var Btn = document.getElementById("btn-select"+id)
        Btn.disabled = false
        setSelect(select => select.filter(item => item !== id))
    }

    const submitCreate = () => {
        projectService.CreateAccessList(select, pid)
        .then(function (response) {
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: response.data.data,
                showConfirmButton: true,
                timer: 5000
            }).then(function () {
                window.location = "/access";
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
                window.location = "/access"
            })
        })
    }

    
    const handleUpdate = (id) => {
        document.getElementById("btn-delete"+id).innerHTML = 'Deleted'
        var Btn = document.getElementById("btn-delete"+id)
        Btn.disabled = true
        setUpdate([...update, id])
    }

    const handleUpdateUndo = (id) => {
        document.getElementById("btn-delete"+id).innerHTML = "<i class='fas fa-trash-alt'></i>"
        var Btn = document.getElementById("btn-delete"+id)
        Btn.disabled = false
        setUpdate(update => update.filter(item => item !== id))
    }


    const submitUpdate = () => {
        projectService.UpdateAccessList(update, pid)
        .then(function (response) {
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: response.data.data,
                showConfirmButton: true,
                timer: 5000
            }).then(function () {
                window.location = "/access";
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
                window.location = "/access"
            })
        })
    }



    return(
        <>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm">
                    <div class="todo-container">
                        <header>
                            <div class="date">
                                <span class="day-number">{projectname} - User List</span>
                            </div>
                            {update.length == 0 && <button class="add-task-btn" onClick={modalHandle}>
                                <span>+</span>
                            </button>}
                        </header>
                        
                        <main class="todo-list">
                            <div class="row tasks-container">
                                    {userlist.length == 0 && !error && <div class="loader mb-5"></div>}
                                    {userlist.map((user) => (
                                        <div class="col-sm-4 task-container">
                                            <div class={"notice notice-" + user.color}>
                                                <strong>{user.role}</strong>
                                                <p>{user.first_name + " " + user.last_name}</p>
                                                <button id={"btn-delete"+user.id} class="btn" onClick={() => handleUpdate(user.id)}><i class="fas fa-trash-alt"></i></button>
                                                {update.includes(user.id) && <button id={"btn-deleteundo"+user.id} class="btn float-right" onClick={() => handleUpdateUndo(user.id)}><i class="fas fa-undo"></i></button>}
                                            </div>
                                        </div>)
                                    )}
                            </div>
                            
                        </main> 
                        {update.length != 0 && <button class="btnContact float-right" style={{width: "200px"}} onClick={submitUpdate}>Update Changes</button>}
                    </div>
                </div>
            </div>
        </div>

        <Modal show={modalOpen}>
            <ModalHeader>
                <h4 class="text-white">User List</h4>
            </ModalHeader>
            <Modal.Body className="container">
                <div class="row">
                    {alluserlist.length == 0 && <div class="loader mb-5"></div>}                         
                    {alluserlist.map((user) => (
                        user.role!="Admin" && <div class="col-sm-6 task-container">
                            <div class={"notice notice-" + user.color}>
                                <strong>{user.role}</strong>
                                <p>{user.first_name + " " + user.last_name}</p>
                                {user.role == "Block" ? "Can't Add" : <button id={"btn-select" + user.id} class="btn" onClick={() => handleSelect(user.id)}><i class="fas fa-plus-square"></i></button>}
                                {select.includes(user.id) && <button id={"btn-selectundo"+user.id} class="btn float-right" onClick={() => handleSelectUndo(user.id)}><i class="fas fa-undo"></i></button>}
                            </div>
                        </div>)
                    )}
                </div>                            
                <button type="button" className="btnContact mt-4 mb-2" onClick={submitCreate}>Submit</button>                
                <button type="button" className="btnContact mb-4" onClick={modalHandle}>Cancel</button>
            </Modal.Body>
        </Modal>

        </>
    )
}

export default AccessControl