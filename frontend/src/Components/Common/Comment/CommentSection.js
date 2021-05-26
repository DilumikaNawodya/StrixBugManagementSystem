import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { commentService } from '../../../Services/CommentService'
import { authenticationService } from '../../../Services/LoginService';
import Swal from 'sweetalert2'
import Preloader from '../Preloader/Preloader';
import Error from '../Errors/Error';

function CommentSection({ tid }) {

    const { comments, loading, error, message } = commentService.GetCommentList(tid)
    const formikRef = useRef()
    const comment = {
        message: '',
        commentmedia: ''
    }
    const [update, setUpdate] = useState(0)
    const [imageUpload, setImageUpload] = useState({
        commentmedia: ''
    })


    function onSubmit(fields, { setStatus, setSubmitting }) {
        if (update != 0) {
            let formdata = new FormData()
            formdata.append('message', fields.message)
            formdata.append('commentmedia', fields.commentmedia)

            commentService.UpdateComment(formdata, update)
                .then(function (response) {
                    window.location.reload(true)
                })
                .catch(function (error) {
                    window.location.reload(true)
                })
        } else {
            let formdata = new FormData()
            formdata.append('message', fields.message)
            formdata.append('tid', tid)
            formdata.append('commentmedia', fields.commentmedia)

            commentService.PostComment(formdata)
                .then(function (response) {
                    window.location.reload(true)
                })
                .catch(function (error) {
                    window.location.reload(true)
                })
        }
    }

    function onUpdate(id) {
        setUpdate(id)
        commentService.GetComment(tid, id).then(comment => {
            formikRef.current.setFieldValue("message", comment.data["message"], false)
            setImageUpload({
                commentmedia: comment.data.commentmedia
            })
        })
    }

    function onDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to change a critical detail",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                commentService.DeleteComment(id)
                    .then(function (response) {
                        Swal.fire({
                            position: 'middle',
                            icon: 'success',
                            title: response.data.data,
                            showConfirmButton: true,
                            timer: 5000
                        }).then(function () {
                            window.location.reload(true)
                        })
                    })
                    .catch(function (error) {
                        Swal.fire({
                            position: 'middle',
                            icon: 'warning',
                            title: error.response.data.data,
                            showConfirmButton: true,
                            timer: 5000
                        }).then(function () {
                            window.location.reload(true)
                        })
                    })
            }
        })
    }


    function ImagePreview(image) {
        Swal.fire({
            position: 'middle',
            showConfirmButton: true,
            html: "<img src='" + image + "' width='100%' height='100%'/>",
            customClass: 'swal-wide'
        })
    }


    return (

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="comment-widgets m-b-20">

                            {!error && comments.map((item, index) => {
                                return (
                                    <div class="d-flex flex-row comment-row">
                                        <div class="p-2"><span class="round"><img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="user" width="50" /></span></div>
                                        <div class="p-2 comment-text">
                                            <h5>{item.commented_user.first_name + " " + item.commented_user.last_name}</h5>
                                            <div class="comment-footer">
                                                <span class="date">{item.datetime}</span>
                                                <span class={"ml-3 badge badge-" + item.commented_user.color}>{item.commented_user.role}</span>
                                                {authenticationService.userID == item.commented_user.id && <span class="action-icons">
                                                    <button class="btn" onClick={() => { onUpdate(item.id) }}><i class="fa fa-pencil mr-3 ml-3"></i></button>
                                                    <button class="btn" onClick={() => { onDelete(item.id) }}><i class="fas fa-trash-alt"></i></button>
                                                </span>}
                                            </div>
                                            <p class="m-b-5 m-t-10" style={{ fontSize: "14px" }}>{item.message}</p>
                                            {item.commentmedia != null && <div class="d-flex flex-row comment-row">
                                                <img src={item.commentmedia} width="100%" height="auto" onClick={() => { ImagePreview(item.commentmedia) }} />
                                            </div>}
                                        </div>
                                    </div>
                                )
                            })}

                            {!error && <Formik innerRef={formikRef} initialValues={comment} onSubmit={onSubmit}>
                                {({ isSubmitting, setFieldValue }) => {

                                    return (


                                        <Form>
                                            {authenticationService.userRole != "Manager" && <>
                                                <div class="d-flex flex-row comment-row">
                                                    <Field name="message" ype="text" component="textarea" className='pb-cmnt-textarea' />
                                                </div>
                                                {imageUpload.commentmedia != '' && <div class="d-flex flex-row comment-row">
                                                    <img src={imageUpload.commentmedia} width="100%" height="auto" />
                                                </div>}
                                                <div class="comment-row">

                                                    <label for="file-input">
                                                        <span class="fa fa-picture-o fa-lg mr-2"></span>
                                                        Upload Image
                                                    </label>
                                                    <input style={{ display: "none" }} id="file-input" name="commentmedia" class="form-control" type="file" onChange={(event) => {
                                                        setImageUpload({ commentmedia: URL.createObjectURL(event.currentTarget.files[0]) })
                                                        setFieldValue("commentmedia", event.currentTarget.files[0])
                                                    }} />

                                                    <button class="btn btn-dark pull-right" type="submit">
                                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                        Post
                                                    </button>
                                                </div>
                                            </>}
                                        </Form>
                                    )
                                }}
                            </Formik>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentSection