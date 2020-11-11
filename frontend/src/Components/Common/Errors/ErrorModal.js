import React from 'react';
import { NavLink } from 'react-router-dom';
import  './Error.css'

function modal(){

    return(
        <div className="modal d-block"  id="modalPush" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-notify modal-info" role="document">
                <div className="modal-content text-center">
                    <div className="modal-header d-flex justify-content-center bg-dark">
                        <p className="heading display-4 text-white">INVALID LOGIN</p>
                    </div>
                    <div className="modal-body">
                        <span className="cross">&#10008;</span>
                        <h3>You are not a registered user</h3>
                    </div>
                    <div className="modal-footer flex-center">
                        <NavLink to="/" className="btn btn-dark btnSubmit">Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default modal;