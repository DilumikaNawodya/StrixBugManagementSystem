import React, { Component } from 'react';


function Footer(){
    return(
        <div class="fixed-bottom">
            <footer class="font-small bg-dark">
                <div class="footer-copyright text-center text-white py-3">
                    {new Date().getFullYear()}@Strix -All Rights Reserved
                </div>
            </footer>
        </div>
    )
}

export default Footer;

