import API from './Base';
import { useEffect,useState } from 'react';

export const userService = {
    GetInternalUser,
    GetInternalUserList,
    AddInternalUser,
    DeleteInternalUser,
    UpdateInternalUser,
    
    GetExternalUser,
    GetExternalUserList,
    AddExternalUser,
    DeleteExternalUser,
    UpdateExternalUser,

    UpdateBlockedUser
}

// External Users

function GetExternalUserList(){
    const [state, setState] = useState({
        externalusers:[],
        error:false
    })

    useEffect(()=>{
        API.get('externaluserlist/')
            .then(function (response) {
                setState({
                    externalusers: response.data,
                    error:false
                })
            })
            .catch(function (error) {
                setState({
                    externalusers:[],
                    error:true
                })
            })
    },[])

    return state
}


function GetExternalUser(uid){
    const request = API.get('externaluserlist/' + uid)
    return request
}


function AddExternalUser(fields){
    const request = API.post('externaluserlist/',{
        email: fields.email,
        password: fields.password,
        firstname: fields.first_name,
        lastname: fields.last_name
    },{})
    return request
}

function DeleteExternalUser(uid){
    const request = API.delete('externaluserlist/' + uid)
    return request
}

function UpdateExternalUser(uid, fields){
    const request = API.patch('externaluserlist/' + uid + '/', {
        email: fields.email,
        firstname: fields.first_name,
        lastname: fields.last_name
    },{})
    return request
}


// Internal Users

function GetInternalUserList(){
    const [state, setState] = useState({
        internalusers:[],
        error:false
    })

    useEffect(()=>{
        API.get('internaluserlist/')
            .then(function (response) {
                setState({
                    internalusers: response.data,
                    error:false
                })
            })
            .catch(function (error) {
                setState({
                    internalusers:[],
                    error:true
                })
            })
    },[])
    return state
}

function GetInternalUser(uid){
    const request = API.get('internaluserlist/' + uid)
    return request
}


function AddInternalUser(fields){
    const request = API.post('internaluserlist/',{
        email: fields.email,
        password: fields.password,
        firstname: fields.first_name,
        lastname: fields.last_name,
        role: fields.role
    },{})
    return request
}

function DeleteInternalUser(uid){
    const request = API.delete('internaluserlist/' + uid)
    return request
}

function UpdateInternalUser(uid, fields){
    const request = API.patch('internaluserlist/' + uid + '/', {
        email: fields.email,
        firstname: fields.first_name,
        lastname: fields.last_name
    },{})
    return request
}

// Blocked Users

function UpdateBlockedUser(uid, fields){
    const request = API.patch('blockeduserlist/' + uid + '/', {},{})
    return request
}