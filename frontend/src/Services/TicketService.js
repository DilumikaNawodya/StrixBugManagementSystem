import API from './Base';
import {useReducer,useEffect, useState} from 'react'
import axios from 'axios'


export const ticketService = {
    useFetchBugs,
    Filters
}




const ACTIONS = {
    MAKE_REQUEST:'make-request',
    GET_DATA:'get-data',
    ERROR:'error',
}

function reducer(state,action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return { loading:true, bugs:[] }
        case ACTIONS.GET_DATA:
            return { ...state, loading:false, bugs:action.payload.bugs }
        case ACTIONS.ERROR:
            return { ...state, loading:false, bugs:action.payload.error, bugs:[] }
        default:
            return state
    }
}

function useFetchBugs(pid) {

    const initialState = {
        bugs:[],
        loading:true
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{

        API.post('ticketlist/',{
            pid: 1
        })
        .then(res=>{
            dispatch({
                type: ACTIONS.GET_DATA,
                payload: {bugs: res.data.Tickets }
            })
        })
        .catch((e)=>{
            if(axios.isCancel(e))return
            dispatch({type:ACTIONS.ERROR,payload:{error:e}})
        })

    },[])    

    return state
}


function Filters(){
    const [state, setState] = useState({
        filters:[],
        error:false
    })

    useEffect(()=>{
        API.get('filters/')
            .then(function (response) {
                setState({
                    filters: response.data,
                    error:false
                })
            })
            .catch(function (error) {
                setState({
                    filters:[],
                    error:true
                })
            })
    },[])
    return state
}