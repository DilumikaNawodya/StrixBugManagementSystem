import React, { useState } from "react";
import NavBar from "../Common/Navbar/NavBar";
import { NavLink } from "react-router-dom";
import './AdminLayout.css';
import Footer from "../Common/Footer/Footer";

function AdminLayout({page}){

    const [expan, setExpan] = useState(false)

    const onExpand = () => {
        if(expan){
            setExpan(false)
        }else{
            setExpan(true)
        }
    }

    return(
        <>
            <NavBar/>
            <div class="wrapper">
                <div class="sidebar bg-dark">
                    <ul>
                        <li><NavLink to="/Admin"><i class="fas fa-home"></i>Dashboard</NavLink></li>
                        <li><NavLink to="/Admin/ExternalUsers"><i class="fas fa-users"></i>External Users</NavLink></li>
                        <li><NavLink to="/Admin/InternalUsers"><i class="fas fa-users"></i>Internal Users</NavLink></li>
                        <li><NavLink to="/Admin/Projects"><i class="fas fa-project-diagram"></i>Projects</NavLink></li>
                        <li><NavLink to="/Admin/Permissions"><i class="fas fa-key"></i>Access Control</NavLink></li>
                    
                        {/* <li>
                            <a class="accordion-toggle collapsed toggle-switch" data-toggle="collapse" href="#submenu-2">
                                <span><i class="fas fa-users"></i></span>
                                <span>Management</span>
                                <b class="caret"></b>
                            </a>
                            <ul id="submenu-2" class="panel-collapse collapse panel-switch" role="menu">
                                <li><a href="#">Users</a></li>
                                <li><a href="#">Roles</a></li>
                            </ul>
                        </li> */}

                    </ul> 
                </div>

                <div class="main_content container-fluid">
                    {page}
                </div>
            </div>
        </>
    )
}

export default AdminLayout;