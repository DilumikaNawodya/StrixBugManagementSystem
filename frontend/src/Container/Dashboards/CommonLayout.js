import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import Footer from '../../Components/Common/Footer/Footer';
import { authenticationService } from '../../Services/LoginService';
import { Modal } from 'react-bootstrap';

function CommonLayout({page, SidebarItem, SidebarItemDrop}){

    const [StyleClass, setStyleClass] = useState("sb-nav-fixed")

    const handleStyleChange = () => {
        if(StyleClass=="sb-nav-fixed"){
            setStyleClass("sb-nav-fixed sb-sidenav-toggled")
        }else{
            setStyleClass("sb-nav-fixed")
        }
    }

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
        <div class={StyleClass}>
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <button class="btn btn-link btn-sm order-1 order-lg-0 ml-3" id="sidebarToggle" onClick={handleStyleChange}><i class="fas fa-bars"></i></button>
                <a class="navbar-brand" href="index.html">STRIX</a>
    
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#">Profile</a>
                            <a class="dropdown-item" href="#" onClick={modalOpen}>Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>

            <div id="layoutSidenav">
                <IconContext.Provider value={{ color: '#fff' }}>
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav sb-margin-top">

                                {SidebarItem.map((item, index) => {
                                return (
                                    <a key={index} class="nav-link" href={item.path}>
                                        <div class="sb-nav-link-icon">{item.icon}</div>
                                            {item.title}
                                    </a>
                                );
                                })}

                                {SidebarItemDrop.map((item, index) => {
                                return(
                                    <div>

                                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target={"#collapse"+index} aria-expanded="false" aria-controls={index}>
                                            <div class="sb-nav-link-icon">{item.icon}</div>
                                                {item.title}
                                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                        </a>
                                        <div class="collapse" id={"collapse"+index} aria-labelledby={"heading"+index} data-parent="#sidenavAccordion">
                                            <nav class="sb-sidenav-menu-nested nav">
                                            {item.dropDown.map((itemdrop, index) => {
                                                return(<a class="nav-link" href={itemdrop.path}>{itemdrop.name}</a>)
                                            })}
                                            </nav>
                                        </div>     
                                    </div>
                                )
                                })}

                            </div>
                        </div>
                        <div class="sb-sidenav-footer">
                            <div class="small">Logged in as:</div>
                            {authenticationService.currentUserValue.Name}
                        </div>
                    </nav>
                </div>

                </IconContext.Provider>

                <div id="layoutSidenav_content">
                    <main class="container-fluid mb-3">
                        {page}
                    </main>
                    <Footer/>
                </div>
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
    </>
    )
}


export default CommonLayout;