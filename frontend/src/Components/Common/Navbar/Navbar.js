import React,{ useState,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { authenticationService } from '../../../Services/LoginService';
import { BehaviorSubject } from 'rxjs';
import './NavBar.scss'

const projectID = new BehaviorSubject(JSON.parse(localStorage.getItem('projectID')));

function NavBar({items,page,sideBarItems}){

    const [state,setState] = useState(true)
    const [style,setStyle] = useState("content-withsidebar mt-5")
    const [logoutModal,setModal] = useState(false)
    const [clicked,setClick] = useState(false)

    useEffect(()=>{
        if(!items){
            setState(false)
            setStyle("content-withoutsidebar mt-5")
        }
    })

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

    const isObjectLike = (value) => {
        return value != null && typeof value == 'object';
    }

    const side = () => {

        return Object.keys(sideBarItems).map((key,value) => {
            if(isObjectLike(sideBarItems[key])){
                return(
                    <div class="dropdown">
                        <a class="dropbtn">
                            {key}
                        </a>
                        <div class="dropdown-content">
                            {   
                                Object.keys(sideBarItems[key]).map((name,val) => {
                                return(
                                    <a href={sideBarItems[key][name]}>{name}</a>
                                )})
                            }
                        </div>
                    </div>
                )
            }else{
                if(key==="Backlog"){
                    return(
                        <a href={sideBarItems[key]+projectID.value} onClick={clicked}>{key}</a>
                    )
                }
                else{
                    return(
                        <a href={sideBarItems[key]}>{key}</a>
                    )
                }
            }
        })

    }


    return(
        <div>
                <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a class="navbar-brand" href="#">Strix</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
                        aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent-333">
                        <ul class="navbar-nav ml-auto nav-flex-icons">
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

                <div>
                        {state && <div class="sidebar">
                                    {side()}
                        </div>}

                        <div class={style}>
                            {page}
                        </div>

                </div>
    
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
        </div>
    )
}

export default NavBar;