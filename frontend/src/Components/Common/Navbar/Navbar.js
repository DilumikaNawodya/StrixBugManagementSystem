import React, { useState } from "react"
import { Modal, NavDropdown ,Button} from "react-bootstrap"
import { authenticationService } from "../../../Services/LoginService"
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'



function NavBar(){


    const [logoutModal,setModal] = useState(false)

    const modalOpen = () => {
        setModal(true)
    }
    const modalLogout = () => {
        setModal(false)
        authenticationService.logout()
    }

    const modalClose = () => {
        setModal(false)
    }


    return(
        <>
            <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <a class="navbar-brand" href="#">Strix</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
                    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent-333">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-user"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-default"
                                aria-labelledby="navbarDropdownMenuLink-333">
                                <a class="dropdown-item" href="#">Profile</a>
                                <a class="dropdown-item" onClick={modalOpen}>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            <Modal show={logoutModal}>
                <Modal.Header>
                    <i class="far fa-frown"></i>
                </Modal.Header>
                <Modal.Body>
                    <div class="head_txt"></div>
                    <div class="body_txt">Are you sure you want to log out ?</div>
                    <center>
                        <button class="btn btn-dark" onClick={modalLogout}>Log out</button>
                        <button class="btn btn-dark ml-3" onClick={modalClose}>Cancel</button>
                    </center>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavBar;