import React, { Component, useState } from 'react';
import  './NavigationBar.css'
import {authenticationService} from '../../../Services/LoginService'
import { Modal } from 'react-bootstrap';

function NavigationBar(){

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
    <div>
      <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          STRIX
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
          aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent-333">

          <ul class="navbar-nav mr-auto">

            <li class="nav-item active">
              <a class="nav-link" href="#">
                <i class="fa fa-fw fa-home mr-2"></i>
                  Home
                <span class="sr-only">(current)</span>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="fa fa-fw fa-hands-helping mr-2"></i>
                  Help
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="fa fa-fw fa-address-card mr-2"></i>
                  About Us
              </a>
            </li>

          </ul>
          <ul class="navbar-nav ml-auto nav-flex-icons">

            {/* <div class="d-flex justify-content-center">
              <div class="searchbar">
                <input class="search_input" type="text" name="" placeholder="Search..."/>
                <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
              </div>
            </div> */}

            <li class="nav-item dropdown">

              <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-cog"></i>
              </a>

              <div class="dropdown-menu dropdown-menu-right dropdown-default"
                aria-labelledby="navbarDropdownMenuLink-333">
                <button class="dropdown-item">
                  <i class="fa fa-fw fa-id-badge mr-2"></i>
                    Profile
                </button>
                <button class="dropdown-item" onClick={modalOpen}>
                  <i class="fa fa-fw fa-sign-out-alt mr-2"></i>
                    Log out
                </button>
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

    </div>
  )
}



// function NavigationBar() {
  
//     return(
//         <Navbar bg="dark" expand="lg">
//           <Navbar.Toggle aria-control="basic-navbar-nav"/>
//           <Navbar.Collapse id ="basic-navbar-nav" >
         
      
//           <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist">   <span class="badge badge-secondary">Strix</span></NavLink>
  
//               <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist" ><i class="fa fa-fw fa-home"></i> Home </NavLink>
  
//               <NavLink className="d-inline p-2 bg-dark text-white" to="/Help">Help</NavLink>
//               <NavLink className="d-inline p-2 bg-dark text-white" to="/Aboutus"><i class="fa fa-fw fa-envelope"></i>  About Us </NavLink>
              
//               </Navbar.Collapse>
//           <Form inline>
//       <FormControl type="text" placeholder="Search" className="mr-sm-2" /> {/* Margin right(Padding , Small and up by 2) */}
//                  <Button variant="outline-primary text-white"><i class="fa fa-fw fa-search"></i>  Search..</Button>
     
//       <NavDropdown title="Log Out"  className=" " id="basic-nav-dropdown">

//         <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
//         <NavDropdown.Item href="#" onClick={authenticationService.logout}><i class="fa fa-fw fa-user"></i>Log Out</NavDropdown.Item>
       
//       </NavDropdown>
      
//       </Form>
     
//         </Navbar>
        
//     )
//   }
export default NavigationBar;
