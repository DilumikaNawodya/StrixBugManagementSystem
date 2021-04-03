import API from "./Base";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";

export const ticketService = {
  FetchBugsForBMS,
  FetchBugsForBSP,
  Filters,
  FetchBugsForApprovedBSP,
};
/*
const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, bugs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, bugs: action.payload.bugs };
    case ACTIONS.ERROR:
      return { ...state, loading: false, bugs: action.payload.error, bugs: [] };
    default:
      return state;
  }
}
// Bug management system
function FetchBugsForBMS(pid) {
  const initialState = {
    bugs: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    API.post("ticketlist/", {
      pid: pid,
    })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { bugs: res.data.Tickets },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });
  }, []);

  return state;
}
*/

function Filters() {
  const [state, setState] = useState({
    filters: [],
    error: false,
  });

  useEffect(() => {
    API.get("filters/")
      .then(function (response) {
        setState({
          filters: response.data,
          error: false,
        });
      })
      .catch(function (error) {
        setState({
          filters: [],
          error: true,
        });
      });
  }, []);
  return state;
}

//Manager's bsp
function FetchBugsForBSP(pid){
    const [state, setState] = useState({
        bspList:[],
        error:false
    })

    useEffect(()=>{
        API.get('/approvalTickets/?pid='+pid)
            .then(function (response) {
                setState({
                    bspList: response.data,
                    error:false
                })
            })
            .catch(function (error) {
                setState({
                    bspList:[],
                    error:true
                })
            })
    },[])

    return state
}

//testBMS
function FetchBugsForBMS(pid){
  const [state, setState] = useState({
      bmsList:[],
      error:false
  })

  useEffect(()=>{
      API.get('/bmstest/?pid='+pid)
          .then(function (response) {
              setState({
                bmsList: response.data,
                  error:false
              })
          })
          .catch(function (error) {
              setState({
                bmsList:[],
                  error:true
              })
          })
  },[])

  return state
}

//Approved bsp
function FetchBugsForApprovedBSP(pid){
    const [state, setState] = useState({
        approvedBSPList:[],
        error:false
    })

    useEffect(()=>{
        API.get('/bsp/?pid='+pid)
            .then(function (response) {
                setState({
                    approvedBSPList: response.data,
                    error:false
                })
            })
            .catch(function (error) {
                setState({
                    approvedBSPList:[],
                    error:true
                })
            })
    },[])

    return state
}