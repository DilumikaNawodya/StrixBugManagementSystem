import API from './Base';
import { useEffect,useState } from 'react';


export const projectService = {
    GetProjectList,
    GetProject,
    CreateProject,
    UpdateProject,
    DeleteProject,

    GetAccessList,
    CreateAccessList,
    UpdateAccessList,

    setCurrentProject,
    removeCurrentProject,
    getCurrentProject,

    GetAllUserList
}


function GetProjectList() {

    const [state, setState] = useState({
        projects:[],
        error:false,
        loading: true,
        message: ""
    })

    useEffect(()=>{
        API.get('projectlist/')
            .then(function (response) {
                setState({
                    projects: response.data,
                    error:false,
                    loading: false,
                    message: ""
                })
            })
            .catch(function (error) {
                setState({
                    projects:[],
                    error:true,
                    loading: false,
                    message: error.response.data.detail
                })
            })
    },[])
    return state
    
}

function GetProject(pid) {
    const request = API.get('projectlist/' + pid)
    return request
}

function CreateProject(fields) {
    const request = API.post('projectlist/',{
        projectname: fields.projectname,
        description: fields.description
    },{})
    return request
}


function UpdateProject(pid, fields) {
    const request = API.patch('projectlist/' + pid + '/',{
        projectname: fields.projectname,
        description: fields.description
    },{})
    return request
}

function DeleteProject(pid) {
    const request = API.delete('projectlist/' + pid)
    return request
}


function GetAccessList(pid){

    const [state, setState] = useState({
        projectname: '',
        userlist: [],
        error: false
    })

    useEffect(()=>{
        API.get('accesslist/'+pid)
            .then(function (response) {
                setState({
                    projectname: response.data.projectname,
                    userlist: response.data.userlist,
                    error:true
                })
            })
            .catch(function (error) {
                setState({
                    projectname: '',
                    userlist: [],
                    error:true
                })
            })
    },[])
    return state
}

function CreateAccessList(select, pid){
    const request = API.post('/accesslist/',{
        select: select,
        pid: pid
    },{})

    return request
}

function UpdateAccessList(update, pid){
    const request = API.patch('/accesslist/' + pid + '/',{
        update: update
    },{})

    return request
}


function setCurrentProject(pid){
    localStorage.setItem('currentProject', JSON.stringify(pid))
}

function removeCurrentProject(){
    localStorage.removeItem("currentProject")
}

function getCurrentProject(){
    var currentProjectSubject = localStorage.getItem('currentProject')
    return currentProjectSubject
}

export async function GetProjetDetails(projectid){
   
    const response = await API.get('getProject/?id='+projectid)
    const arrr=response.data; 
    return(arrr)
}

function GetAllUserList(pid){

    const [state, setState] = useState({
        alluserlist: [],
        error1: false
    })

    useEffect(()=>{
        API.get('alluserlist/?pid='+pid)
            .then(function (response) {
                setState({
                    alluserlist: response.data,
                    error1:false
                })
            })
            .catch(function (error) {
                setState({
                    alluserlist: [],
                    error1:true
                })
            })
    },[])

    return state
}