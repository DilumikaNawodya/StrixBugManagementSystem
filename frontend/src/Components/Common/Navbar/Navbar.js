import React,{ useState,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { authenticationService } from '../../../Services/LoginService';
import './NavBar.scss'


function NavBar({items,page,sideBarItems}){

    const [state,setState] = useState(true)
    const [style,setStyle] = useState("col-md-9 col-lg-10 px-4 ml-sm-auto")
    const [logoutModal,setModal] = useState(false)


    useEffect(()=>{
        if(!items){
            setState(false)
            setStyle("col-md-12 col-lg-12 px-4")
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


    return(
        <div>

            <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">STRIX</a>
                <div class="my-2 my-lg-0 row mr-3">
                    <button class="btn text-white" href="#">Profile</button>
                    <button class="btn text-white" onClick={modalOpen}>Logout</button>
                </div>
            </nav>


            <div class="container-fluid">

                <div class="row">

                    {state && <nav class="col-md-2 d-none d-md-block sidebar">
                        <div class="sidebar-sticky">
                            <ul class="nav flex-column">
                                {sideBarItems.map(itemName => (
                                    <li class="nav-item">
                                        <a class="nav-link text-white" href="#">
                                            <span data-feather="home"></span>
                                                {itemName}
                                            <span class="sr-only">(current)</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>}

                    <main role="main" class={style}>
                        {page}
                    </main>
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