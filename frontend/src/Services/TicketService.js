import API from './Base';
import {useReducer,useEffect} from 'react'
import axios from 'axios'

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

function Filter(data,params){

    var filteredData = data

    Object.keys(params).map((key,value)=>{
        if(params[key]!="All"){
            filteredData = data.filter(function(obj) {
                return obj[key] === params[key];
            })
        }
    })
    return filteredData
}


function useFetchBugs(params,pid) {

    const initialState = {
        bugs:[],
        loading:true,
        params:''
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{

        API.post('ticketlist/',{
            pid: pid
        })
        .then(res=>{
            dispatch({
                type: ACTIONS.GET_DATA,
                payload: {bugs: Filter(res.data.Tickets,params)}
            })
        })
        .catch((e)=>{
            if(axios.isCancel(e))return
            dispatch({type:ACTIONS.ERROR,payload:{error:e}})
        })

    },[params])    

    return state
}

export default useFetchBugs;