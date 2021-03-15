import API from './Base';
import { useEffect,useState } from 'react';

export const userService = {
    GetInternalUserList,
    GetExternalUserList,
    AddExternalUser
}

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


function AddExternalUser(email, password, firstname, lastname){
    const request = API.post('externaluserlist/',{
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })
    return request
}