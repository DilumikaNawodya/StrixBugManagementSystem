import API from "./Base";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

export const ticketService = {
  Filters,
  GetCustomeData,
  StateChange,
  FetchBugs,
  FetchOneBug,
  FetchBugsForBSP,

  UpdateByManager,
  UpdateByQA,
  UpdateByDev,

  GetTicketMedia,
};

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

// Get Custome data - Workstates=4, Bugtype=1, Priority level=2, Severity level=3

function GetCustomeData(id) {
  const [state, setState] = useState({
    customeData: [],
    error: false,
  });

  useEffect(() => {
    API.get("customedatalist/?customeid=" + id)
      .then(function (response) {
        console.log(response.data);
        setState({
          customeData: response.data,
          error: false,
        });
      })
      .catch(function (error) {
        setState({
          customeData: [],
          error: true,
        });
      });
  }, []);
  return state.customData;
}

function StateChange(rowData, approval, bspstatus) {
  const request = API.patch(
    "/bspticketlist/" + rowData.id + "/",
    {
      approval: approval,
      bspstatus: bspstatus,
    },
    {}
  );
  return request;
}

function FetchBugs(pid) {
  const [state, setState] = useState({
    bmsList: [],
    error: false,
  });

  useEffect(() => {
    API.get("/ticketlist/?pid=" + pid)
      .then(function (response) {
        setState({
          bmsList: response.data,
          error: false,
        });
      })
      .catch(function (error) {
        setState({
          bmsList: [],
          error: true,
        });
      });
  }, []);

  return state;
}

// async function FetchOneBug(pid, tid) {
//   const [state, setState] = useState({
//     issue: [],
//     error: false,
//   });

//   useEffect(() => {
//     API.get("/ticketlist/" + tid + "/?pid=" + pid)
//       .then(function (response) {
//         setState({
//           issue: response.data,
//           error: false,
//         });
//       })
//       .catch(function (error) {
//         setState({
//           issue: [],
//           error: true,
//         });
//       });
//   }, []);

//   return state;
// }
async function FetchOneBug(pid, tid) {
  let issue = await API.get("/ticketlist/" + tid + "/?pid=" + pid);
  return issue.data;
}

function UpdateByManager(totaleffort, tid) {
  const request = API.patch("/ticketlist/" + tid + "/?type=1", {
    totaleffort: totaleffort,
  });
  return request;
}

function UpdateByQA(fields, tid) {
  const request = API.patch("/ticketlist/" + tid + "/?type=2", fields);
  return request;
}

function UpdateByDev(dailyeffort, tid) {
  const request = API.patch("/ticketlist/" + tid + "/?type=3", {
    dailyeffort: dailyeffort,
  });
  return request;
}

function GetTicketMedia(tid) {
  const [state, setState] = useState({
    ticketMedia: [],
    error: false,
  });

  useEffect(() => {
    API.get("/ticketmedia/?tid=" + tid)
      .then(function (response) {
        setState({
          ticketMedia: response.data,
          error: false,
        });
      })
      .catch(function (error) {
        setState({
          ticketMedia: [],
          error: true,
        });
      });
  }, []);

  return state;
}

//Approved bsp ( set statusid = 1 to get Approved Tickets, set statusid = 2 to get Pending Tickets)

function FetchBugsForBSP(pid, statusid) {
  const [state, setState] = useState({
    BSPList: [],
    error: false,
  });

  useEffect(() => {
    API.get("/bspticketlist/?pid=" + pid + "&statusid=" + statusid)
      .then(function (response) {
        setState({
          BSPList: response.data,
          error: false,
        });
      })
      .catch(function (error) {
        setState({
          BSPList: [],
          error: true,
        });
      });
  }, []);

  return state;
}


///////////////////////////////////////YR///////////////////////
export default async function getTickets(pid) {


  // API.get('getTicket/')
  //     .then(response => { arr.push(response.data) })
  //     .catch(err=>{console.log(err)})
  // return arr
  const response = await API.get('getTicket/?project=' + pid);
  const arrr = response.data;
  return (arrr);
}

export async function 
createTicket(data) {
  try {
    let a = await API.post('getTicket/', data)
    if(a.status===200){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'New issue created successfully',
        showConfirmButton: true,
        // timer: 1500
      })
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error occurred',
        showConfirmButton: true,
        // timer: 1500
      })
    }

  } catch (error) {

    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error occurred',
      showConfirmButton: true,
      // timer: 1500
    })
  }
  
}

export async function getMonthlyBugSummary(year, month) {
  var date= new Date(year,month+1,0); //Take the last date of the month
  var yyyy=date.getUTCFullYear();
  var mm= date.getUTCMonth();
  var dd=date.getUTCDate();
  // var data = await API.get('getBugPerMonth/?date1='+year+'-'+month+'-01&date2='+yyyy+'-'+mm+'-'+dd)
  var data = await API.get('getBugPerMonth/?date1='+month+'&date2='+year)
  return(data.data)
}