import React, { Component } from 'react';


function Footer(){
    return(
        <footer class="py-4 bg-light mt-5">
            <div class="container-fluid">
                <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; STRIX 2021</div>
                    <div>
                        <a href="#">Privacy Policy</a>
                            &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

