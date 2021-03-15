import React,{ useState } from 'react'
import { Formik } from 'formik';
import './Form.scss'
import { userService } from '../../../Services/UserService';
import { useHistory } from 'react-router';

function ExternalUserForm(props){

    const history = useHistory()

    return(
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}

            onSubmit={(values, { setStatus, setSubmitting }) => {
                setStatus()
                userService.AddExternalUser(values.email, values.password, values.firstname, values.lastname)
                    .then(function (response) {
                        history.push('/externalusers')
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }}

            render={({ values, handleChange, handleSubmit }) => (

                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="email" class="large mb-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="example@email.com"
                            onChange={handleChange}
                            value={values.email}
                        />
                    </div>
                    <div class="form-group">
                        <label for="password" class="large mb-1">Password</label>
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
                    <div class="form-group">
                        <label for="firstname" class="large mb-1">First Name</label>
                        <input
                            id="firstname"
                            name="firstname"
                            type="firstname"
                            className="form-control"
                            placeholder="John"
                            onChange={handleChange}
                            value={values.firstname}
                        />
                    </div>
                    <div class="form-group">
                        <label for="lastname" class="large mb-1">Last Name</label>
                        <input
                            id="lastname"
                            name="lastname"
                            type="lastname"
                            className="form-control"
                            placeholder="Doe"
                            onChange={handleChange}
                            value={values.lastname}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark mb-3 btn-block">Submit</button>
                </form>
            )}
        />
    )
}


export default ExternalUserForm;