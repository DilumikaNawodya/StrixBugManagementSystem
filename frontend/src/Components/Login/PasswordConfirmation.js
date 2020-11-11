import React, { useEffect, useState } from 'react';
import { authenticationService } from '../../Services/LoginService';
import loginImage from '../../Assets/login.jpg';
import  './LoginForm.scss';
import { Formik } from 'formik';

function PasswordConfirmation(props){

    const [confirm,setConfirm] = useState({
        status: false,
        uid: "",
        token: ""
    })


    useEffect(() => {
        authenticationService.PasswordConfirmation(props.match.params.uid,props.match.params.token)
            .then(function(response){
                setConfirm({
                    status: true,
                    uid: response.data.uid,
                    token: response.data.token
                })
            })
            .catch(function(error){
                setConfirm({
                    uid: "",
                    token: ""
                })
            })
    },[])

    return(
        <div class="container">
            {confirm.status && <div class="login-card">
                <div class="row no-gutters">

                    <div class="col-md-5">
                        <img src={loginImage} alt="login" class="login-card-img" />
                    </div>

                    <div class="col-md-7">

                        <div class="card-body">

                            <div class="brand-wrapper display-4">
                                STRIX
                            </div>
                            <p class="login-card-description">Set New Password</p>

                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}

                                onSubmit={(values , { setStatus, setSubmitting }) => {
                                    setStatus()

                                    authenticationService.SetPassword(values.password, values.password_re,confirm)
                                        .then(function(response){
                                            const path = '/'
                                            const { from } = { from: { pathname: path } }
                                            props.history.push(from);
                                        })
                                        .catch(function(error){
                                            console.log(error.response)
                                            const path = '/loginerror';
                                            const { from } = { from: { pathname: path } };
                                            props.history.push(from);
                                        })
                                }}

                                render={({values,handleChange,handleSubmit}) => (

                                        <form onSubmit={handleSubmit}>
                                        <div class="form-group">
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
                                        <div class="form-group mb-4">
                                            <label for="password_re" class="sr-only">Re-Type Password</label>
                                            <input
                                                id="password_re"
                                                name="password_re"
                                                type="password"
                                                className="form-control" 
                                                placeholder="*****************"
                                                onChange={handleChange}
                                                value={values.password_re}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-block login-btn mb-4 bg-dark">Set Password</button>
                                        </form>
                                 )}
                            />
                        </div>
                    </div>
                </div>
            </div>}

            

        </div>


    )
}

export default PasswordConfirmation;