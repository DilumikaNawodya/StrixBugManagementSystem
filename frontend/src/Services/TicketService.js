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

export default function useFetchBugs(params) {

    const initialState = {
        bugs:[],
        loading:true,
        params:''
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{

        dispatch({type:ACTIONS.MAKE_REQUEST})
        API.get('projectlist/',{
            params:{...params}
        })
        .then(res=>{
            dispatch({
                type: ACTIONS.GET_DATA,
                payload:{bugs:res.data}
            })
        })
        .catch((e)=>{
            if(axios.isCancel(e))return
            dispatch({type:ACTIONS.ERROR,payload:{error:e}})
        })

    },[params])    

    return state
    
}
