import API from './Base';
import React, { useEffect,useState } from 'react';


export default function GetProjectList() {

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
