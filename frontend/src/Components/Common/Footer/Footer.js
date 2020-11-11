import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink} from 'react-bootstrap';


function Footer(){
    return(
        <div className="fixed-bottom">
            <footer class="font-small bg-dark">
                <div class="footer-copyright text-center text-white py-3">
                    {new Date().getFullYear()}@Strix -All Rights Reserved
                </div>
            </footer>
        </div>
    )
}

export default Footer;

