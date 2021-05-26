import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useredit from '../../../Assets/edit.svg'
import useradd from '../../../Assets/add.svg'
import Swal from 'sweetalert2'
import { projectService } from '../../../Services/ProjectService';
import * as AiIcons from 'react-icons/ai';

function ProjectForm({ pid }) {

    const isAddMode = pid == 0 ? true : false

    const initialValues = {
        projectname: '',
        description: '',
    };

    const validationSchema = Yup.object().shape({
        projectname: Yup.string()
            .required('Project Name is required'),
        description: Yup.string()
            .required('Description is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus()
        if (isAddMode) {
            createUser(fields, setSubmitting)
        } else {
            updateUser(pid, fields, setSubmitting)
        }
    }

    function createUser(fields, setSubmitting) {
        projectService.CreateProject(fields)
            .then(function (response) {
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: response.data.data,
                    showConfirmButton: true,
                    timer: 5000
                }).then(function () {
                    window.location = "/projects";
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
                    window.location = "/projects"
                })
            })
    }

    function updateUser(pid, fields, setSubmitting) {
        projectService.UpdateProject(pid, fields)
        .then(function (response) {
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: response.data.data,
                showConfirmButton: true,
                timer: 5000
            }).then(function () {
                window.location = "/projects";
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
                window.location = "/projects"
            })
        })
    }

    const formikRef = useRef()

    useEffect(() => {
        if (!isAddMode) {
            projectService.GetProject(pid).then(project => {
                const fields = ['projectname', 'description'];
                fields.forEach(field => formikRef.current.setFieldValue(field, project.data[field], false))
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

                            <h3>{isAddMode ? 'Add Project' : 'Edit Project'}</h3>

                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Project Name</label>
                                    <Field name="projectname" type="text" className={'form-control' + (errors.projectname && touched.projectname ? ' is-invalid' : '')} onClick={()=>setWar(true)}/>
                                    <ErrorMessage name="projectname" component="div" className="invalid-feedback" />

                                    {!isAddMode && war && <div class="col-sm-12 col-md-12 mt-2">
                                        <div class="alert alert-warning">
                                            <AiIcons.AiOutlineWarning size={25} class="mb-1"/><button type="button" class="close" onClick={()=>setWar(false)} aria-hidden="true">
                                                ×
                                            </button>
                                            <strong class="ml-2">Warning</strong>
                                            <hr class="message-inner-separator" />
                                            <i><p style={{fontFamily: 'roboto'}}>You are about to change a critical detail of this project.</p></i>
                                        </div>
                                    </div>}

                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Description</label>
                                    <Field name="description" type="text" component="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
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

export default ProjectForm