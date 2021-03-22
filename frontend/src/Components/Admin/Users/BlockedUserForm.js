import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useredit from '../../../Assets/edit.svg'
import { userService } from '../../../Services/UserService';
import Swal from 'sweetalert2'

function BlockedUserForm({ uid }) {

    const initialValues = {
        role: 'Block',
    };

    const validationSchema = Yup.object().shape({
        role: Yup.string()
            .required('Role is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        userService.UpdateBlockedUser(uid, fields)
        .then(function (response) {
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: response.data.data,
                showConfirmButton: true,
                timer: 5000
            }).then(function () {
                window.location = "/blockedusers";
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
                window.location = "/blockedusers"
            })
        })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => {

                return (
                    <div class="contact-form">

                        <div class="contact-image">
                            <img src={useredit} alt="rocket_contact" width="100px" height="100px" />
                        </div>

                        <Form>

                            <h3>Change User Role</h3>

                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Role</label>
                                    <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                        <option value="Customer">Customer</option>
                                        <option value="Manager">Manager</option>
                                        <option value="QA">QA</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Block">Block</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="invalid-feedback" />
                                </div>
                            </div>

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

export default BlockedUserForm