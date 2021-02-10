import React,{ useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import './Form.scss'

function ExternalUserForm({props}){

    const [modalstate,setModalState] = useState(false)
    const handleClose = () => setModalState(false);
    const handleOpen = () => setModalState(props.state);

    return(

        <Modal show={modalstate}>
            <Modal.Header>
                <span class="text-white display-4">Add User</span>
            </Modal.Header>
            <Modal.Body>

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}

                    onSubmit={(values, { setStatus, setSubmitting }) => {
                        setStatus()
                    }}

                    render={({ values, handleChange, handleSubmit }) => (

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
                            <button type="submit" className="btn login-btn mb-4 bg-white">Login</button>
                            <button type="button" className="btn login-btn mb-4 bg-white" onClick={handleClose}>Cancel</button>
                        </form>
                    )}
                />


            </Modal.Body>
        </Modal>
    )
}


export default ExternalUserForm;