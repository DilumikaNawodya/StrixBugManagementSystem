import React,{useState,useEffect} from 'react'
import {Card,Badge} from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import Perf from './PerformancePieChart'
import BugSumNum from '../../../Services/Reports/BugSummary/BugSumNum';


function BugSumDashboard() {
   
    const [bugStat, setBugStat] =  useState([]);
    const [totalbugs, setTotalbugs] = useState();
   
    useEffect (()=>{
        let mounted = true;
        BugSumNum()
        .then(i =>{
            if(mounted){
                setBugStat(i);
                console.log(i)
                
            }
           
        })
        return ()=> mounted = false

    },[])
//-----------------Total bugs---------------------
    let count =0;
    for(let i=0 ; i<bugStat.length ; i++){
        count ++;
    }

    console.log(count);
    return (
        <div>
          <div className="row" style={{margin:20}}>
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
                    <Card  className=" shadow rounded  color-block mb-3 mx-auto  z-depth-1-half">
                    <Card.Body>
                        <center>
                       <h4><b>Total Active Projects : {}</b></h4>
                       </center>
                    </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card  className="  shadow rounded color-block mb-3 mx-auto z-depth-1-half">
                    <Card.Body>
                        <center>
                        <h4><b>Bug Completion % : {}</b></h4>
                        </center>
                    </Card.Body>
                    </Card>
                </div>
           
          </div>
          <div className="row">
              <Card className="shadow rounded">
                  Filters (Date (to/from) ,  Developer , project)
              </Card>
          </div>
          <div className="row">
                <div className="col-md-6">
                    <Card className="shadow rounded">
                       Developer * Average effort (Month and Avarage hours)
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card className="shadow rounded">
                      <Perf/>
                    </Card>
                </div>
          </div>
          <div className="row">
                    <Card className="shadow rounded">
                        Project * Bug Development
                        stacked bar chart
                    </Card>
          </div>
          <div className="row">
                    <Card className="shadow rounded">
                        Developer * Bug Development
                        stacked bar chart
                    </Card>
           </div>
         
        </div>
    )
}

export default BugSumDashboard
