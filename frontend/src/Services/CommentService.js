import API from './Base';
import React, { useState, useEffect }  from 'react'

export const commentService = {
    GetCommentList,
    GetComment,
    PostComment,
    DeleteComment,
    UpdateComment
}

function GetCommentList(tid){
    
    const [state, setState] = useState({
        comments: [],
        error: false,
        loading: true,
        message: ""
    })

    useEffect(() => {
        API.get('/commentlist/?tid=' + tid)
            .then(function (response) {
                setState({
                    comments: response.data,
                    loading: false
                })
            })
            .catch(function (error) {
                setState({
                    comments: [],
                    error: true,
                    loading: false,
                    message: error.response.data.detail
                })
            })
    }, [])
    
    return state
}

function GetComment(tid, cid){
    const request = API.get('/commentlist/' + cid + '/?tid=' + tid)
    return request
}

function PostComment(formdata){
    const request = API.post('/commentlist/', formdata, {})
    return request
}

function DeleteComment(cid){
    const request = API.delete('/commentlist/' + cid)
    return request
}

function UpdateComment(formdata, cid){
    const request = API.patch('/commentlist/' + cid + '/', formdata, {})
    return request
}