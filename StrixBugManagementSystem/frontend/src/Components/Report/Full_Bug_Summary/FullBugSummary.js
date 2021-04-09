import React ,{useState, useEffect} from 'react';
import { Card, Badge,Button, Row, Col,Dropdown, Tabs, Tab } from 'react-bootstrap';

function FullBugSummary() {
    useEffect (()=>{
        let mounted = true;
        BugSumNum()
        .then(i =>{
            if(mounted){
                setBugStat(i);    
            }
           
        })
        return ()=> mounted = false

    },[])
//-----------------Total bugs---------------------
    let count =bugStat.length;
    let percentage = Math.round(((bugStat.filter(e=> e.workstate_id==4).length * 100) / count), 2);
    let active = bugStat.filter(e=> e.workstate_id !=4 )
    let actProj =active.filter((ele,ind)=> ind === active.findIndex(elem=> elem.project_id === ele.project_id)).length
    
    return (
        <div>
            <div className="col-md-4">
               
               <Card  className=" text-light  shadow rounded color-block mb-3 mx-auto  z-depth-1-half" style={{backgroundColor:"#414345"}}>
               <Card.Body>
                   <center>
                   <h4><b>Total  Bugs : <Badge  pill variant="success">{count}</Badge></b></h4>
                   </center>
               </Card.Body>
               </Card>
           </div>
           <div className="col-md-4">
               <Card  className="text-light shadow rounded  color-block mb-3 mx-auto  z-depth-1-half" style={{backgroundColor:"#414345"}}>
               <Card.Body>
                   <center>
                  <h4><b>Total Active Projects : <Badge  pill variant="warning"> {actProj}</Badge></b></h4>
                  </center>
               </Card.Body>
               </Card>
           </div>
           <div className="col-md-4">
               <Card  className=" text-light shadow rounded color-block mb-3 mx-auto z-depth-1-half" style={{backgroundColor:"#414345"}}>
               <Card.Body>
                   <center>
                   <h4><b>Bug Completion  :  <Badge  pill variant="success">{percentage} % </Badge></b></h4>
                   </center>
               </Card.Body>
               </Card>
           </div>
        </div>
    )
}

export default FullBugSummary
