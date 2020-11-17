import React,{ useEffect,useState } from 'react';
import  './LoginForm.scss';
import { authenticationService } from '../../Services/LoginService';
import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import loginImage from '../../Assets/login.jpg';
import { Modal } from 'react-bootstrap';

function Login(props){

    const [loginError,setLoginError] = useState(false)

    const handleClose = () => setLoginError(false);
    const handleShow = () => setLoginError(true);


    useEffect(() => {
        if (authenticationService.currentUserValue) { 
            props.history.push('/');
        }
    },[]);

    return(
        <div class="container">
            <div class="login-card">
                <div class="row no-gutters">

                    <div class="col-md-5">
                        <img src={loginImage} alt="login" class="login-card-img" />
                    </div>

                    <div class="col-md-7">

                        <div class="card-body">

                            <div class="brand-wrapper display-4">
                                STRIX
                            </div>
                            <p class="login-card-description">Sign into your account</p>

                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}

                                onSubmit={(values , { setStatus, setSubmitting }) => {
                                    setStatus()
                                    authenticationService.login(values.email, values.password)
                                        .then(function(response){
                                            const path = '/' + response.data.Role;
                                            const { from } = { from: { pathname: path } };
                                            props.history.push(from);
                                        })
                                        .catch(function(error){
                                            handleShow()
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
                                        <div class="form-group mb-4">
                                            <label for="password" class="sr-only">Password</label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                className="form-control" 
                                                placeholder="*****************"
                                                onChange={handleChange}
                                                value={values.password}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-block login-btn mb-4 bg-dark">Login</button>
                                        </form>
                                 )}
                            />
                            <NavLink to='/forgotpassword'>Forgot password?</NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={loginError}>
                <Modal.Header>
                    <i class="far fa-frown"></i>
                </Modal.Header>
                <Modal.Body>
                    <div class="head_txt">Oops !</div>
                    <div class="body_txt">Invalid Email or Password. Try Again</div>
                    <center>
                        <button class="btn btn-dark" onClick={handleClose}>Try Again</button>   
                    </center>   
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Login;