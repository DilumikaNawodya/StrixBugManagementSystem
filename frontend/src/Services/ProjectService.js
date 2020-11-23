import API from './Base';
import { useEffect,useState } from 'react';


export const projectService = {
    GetProjectList,
    GetProject
}


function GetProjectList() {

    const [state, setState] = useState({
        projects:[],
        loading:true,
        error:false
    })

    useEffect(()=>{
        API.get('projectlist/')
            .then(function (response) {
                setState({
                    projects: response.data,
                    loading: false,
                    error:false
                })
            })
            .catch(function (error) {
                setState({
                    projects:[],
                    loading: false,
                    error:true
                })
            })
    },[])

    return state
    
}

function GetProject(pid) {

    const [state,setState] = useState({})

    useEffect(()=>{
        API.post('projectlist/', {
            pid: pid
        })
        .then(function(response){
            console.log(response.data.projectname)
            setState(
                response.data
            )
        })
        .catch(function(error){
            setState(
                {}
            )
        })
    },[])

    return state
}