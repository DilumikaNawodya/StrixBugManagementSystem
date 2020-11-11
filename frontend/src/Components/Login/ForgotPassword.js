import React,{ useEffect,useState } from 'react';
import  './LoginForm.scss'
import { authenticationService } from '../../Services/LoginService';
import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


function ForgotPassword(props){

    const [state_OK,setStateOK] = useState(false)
    const [state_Error,setStateError] = useState(false)

    const handleClose = () => {
        setStateOK(false)
        setStateError(false)
    }

    const handleShowOK = () => {
        setStateOK(true)
    }

    const handleShowError = () => {
        setStateError(true)
    }

    useEffect(() => {
        if (authenticationService.currentUserValue) { 
            props.history.push('/forgotpassword');
        }
    },[]);

    return(
        <div class="container">
            <div class="login-card">
                <div class="row no-gutters">

                    <div class="col-md-5">
                        <img src="/static/media/login.5a82e47d.jpg" alt="login" class="login-card-img" />
                    </div>

                    <div class="col-md-7">

                        <div class="card-body">

                            <div class="brand-wrapper display-4">
                                STRIX
                            </div>
                            <p class="login-card-description">
                                No Problem! Enter your email here
                            </p>

                            <Formik
                                initialValues={{
                                    email: '',
                                }}

                                onSubmit={(values , { setStatus, setSubmitting }) => {
                                    setStatus()
                                    console.log(values)
                                    authenticationService.EmailConfirmation(values.email)
                                        .then(function(response){
                                            handleShowOK()
                                        })
                                        .catch(function(error){
                                            handleShowError()
                                        })
                                }}

                                render={({values,handleChange,handleSubmit}) => (
                                        <form onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="email" class="sr-only">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="form-control" 
                                                placeholder="Email"
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                        </div>
                                            <button type="submit" className="btn btn-block login-btn mb-4 bg-dark">Send Reset Link</button>
                                        </form>
                                 )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={state_Error}>
                <Modal.Header>
                    <i class="far fa-frown"></i>
                </Modal.Header>
                <Modal.Body>
                    <div class="head_txt">Oops !</div>
                    <div class="body_txt">Invalid Email Address. Try Again</div>
                    <center>
                        <button class="btn btn-dark" onClick={handleClose}>Try Again</button>   
                    </center>   
                </Modal.Body>
            </Modal>

            <Modal show={state_OK}>
                <Modal.Header>
                    <i class="far fa-smile"></i>
                </Modal.Header>
                <Modal.Body>
                    <h1 class="display-3 head_txt">Thank You!</h1>
                    <p class="lead body_txt"><b>Please check your email </b>
                        for further instructions on how to reset you password.</p>
                        <hr/>
                    <p class="lead body_txt">
                        Having trouble? <a href="">Contact us</a>
                    </p>
                    <center>
                        <p class="lead">
                            <NavLink to='/' class="btn btn-dark">Continue to homepage</NavLink>
                        </p>   
                    </center>   
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default ForgotPassword;