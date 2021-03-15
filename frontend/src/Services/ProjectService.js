import { BehaviorSubject } from 'rxjs';
import API from './Base';
import { useEffect,useState } from 'react';


export const projectService = {
    GetProjectList,
    GetProject,
    setCurrentProject,
    removeCurrentProject,
    getCurrentProject,
}


function GetProjectList() {

    const [state, setState] = useState({
        projects:[],
        error:false
    })

    useEffect(()=>{
        API.get('projectlist/')
            .then(function (response) {
                setState({
                    projects: response.data,
                    error:false
                })
            })
            .catch(function (error) {
                setState({
                    projects:[],
                    error:true
                })
            })
    },[])

    return state
    
}

function GetProject(pid) {
    const request = API.get('projectlist/'+pid)
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