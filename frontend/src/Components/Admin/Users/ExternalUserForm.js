import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useredit from '../../../Assets/edit.svg'
import useradd from '../../../Assets/add.svg'
import { userService } from '../../../Services/UserService';
import Swal from 'sweetalert2'
import * as AiIcons from 'react-icons/ai';

function ExternalUserForm({ uid }) {

    const isAddMode = uid == 0 ? true : false

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('First Name is required'),
        last_name: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password || isAddMode) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus()
        if (isAddMode) {
            createUser(fields, setSubmitting)
        } else {
            updateUser(uid, fields, setSubmitting)
        }
    }

    function createUser(fields, setSubmitting) {
        userService.AddExternalUser(fields)
            .then(function (response) {
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: true,
                    timer: 5000
                }).then(function () {
                    window.location = "/externalusers";
                })
            })
            .catch(function (error) {
                setSubmitting(false);
                Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: error.response.data.data,
                    showConfirmButton: true,
                    timer: 5000
                }).then(function () {
                    window.location = "/externalusers"
                })
            })
    }

    function updateUser(uid, fields, setSubmitting) {
        userService.UpdateExternalUser(uid, fields)
            .then(function (response) {
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: true,
                    timer: 5000
                }).then(function () {
                    window.location = "/externalusers";
                })
            })
            .catch(function (error) {
                setSubmitting(false);
                Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: error.response.data.data,
                    showConfirmButton: true,
                    timer: 5000
                }).then(function () {
                    window.location = "/externalusers"
                })
            })
    }


    const [user, setUser] = useState()
    const formikRef = useRef()

    useEffect(() => {
        if (!isAddMode) {
            userService.GetExternalUser(uid).then(user => {
                const fields = ['first_name', 'last_name', 'email'];
                fields.forEach(field => formikRef.current.setFieldValue(field, user.data[field], false))
                setUser(user.data)
            })
        }
    }, [])

    const [war, setWar] = useState(false)

    return (
        <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => {

                return (
                    <div class="contact-form">

                        <div class="contact-image">
                            {isAddMode && <img src={useradd} alt="rocket_contact" width="100px" height="100px" />}
                            {!isAddMode && <img src={useredit} alt="rocket_contact" width="100px" height="100px" />}
                        </div>

                        <Form>

                            <h3>{isAddMode ? 'Add User' : 'Edit User'}</h3>

                            <div className="form-row">

                                <div className="form-group col-6">
                                    <label>First Name</label>
                                    <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                </div>

                                <div className="form-group col-6">
                                    <label>Last Name</label>
                                    <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} onClick={()=>setWar(true)}/>
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />

                                    {!isAddMode && war && <div class="col-sm-12 col-md-12 mt-2">
                                        <div class="alert alert-warning">
                                            <AiIcons.AiOutlineWarning size={25} class="mb-1"/><button type="button" class="close" onClick={()=>setWar(false)} aria-hidden="true">
                                                ×
                                            </button>
                                            <strong class="ml-2">Warning</strong>
                                            <hr class="message-inner-separator" />
                                            <i><p style={{fontFamily: 'roboto'}}>You are about to change a critical detail of this user.</p></i>
                                        </div>
                                    </div>}

                                </div>
                            </div>

                            {isAddMode && <div className="form-row">
                                <div className="form-group col">
                                    <label>
                                        Password
                                    </label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col">
                                    <label>Confirm Password</label>
                                    <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                </div>
                            </div>}


                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting} className="btnContact">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </button>
                            </div>

                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default ExternalUserForm