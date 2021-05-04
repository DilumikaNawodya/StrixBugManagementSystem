import React ,{useState, useEffect} from 'react';
import { Card, Badge, Row, Tabs, Tab, Collapse } from 'react-bootstrap';
import BugSumNum from '../../Services/Reports/BugSummary/BugSumNum';
import 'react-datepicker/dist/react-datepicker.css'
import {HiOutlineDocumentReport} from 'react-icons/hi'
import {AiOutlineBarChart} from 'react-icons/ai'
import {IoBugSharp} from 'react-icons/io5'
import {VscDebugAlt} from 'react-icons/vsc'
import Month_BugDev from './Charts/Month_BugDev';
import DevPerformanceFiltering from './Charts/DevPerformance_filters/DevPerformanceFiltering';
import Dev_Performance_default from './Charts/DevPerformance_filters/Dev_Performance_default';
import ProjectBugDev from './Charts/ProjectBugDev';

function ProjectReportDashboard(){
    const [bugStat, setBugStat] =  useState([]);

    //Collapse filters
    const [open, setOpen] = useState(false);


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


    return(
  
        <div>
           
            <div className="row" style={{ paddingTop: 5 }}>
                <div className="col-md-6">
                    <Card.Title><h2> <IoBugSharp size={45}/>{' '}<b>Bug Report Dashboard</b></h2>Overrall Summary <hr/></Card.Title>
                </div>
                <div className="col-md-6">
                    <div className="p-2 mb-1">
                       
                    </div>
                </div>
            </div>
                <div>
                  <h5> <VscDebugAlt/>{' '} Full Bug Summary </h5><hr className="bg-dark"/>
                </div>
            <div className="row" style={{marginTop:5}}>
                
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
                    <div>
                        <div>
                            <div style={{marginTop:10}}></div>
                            <div style={{marginTop:10}}><h5> <AiOutlineBarChart size={30}/>{' '} Developer Performance</h5></div>
                            <hr className="bg-dark" />
                           
                                <Tabs  defaultActiveKey="home" id="uncontrolled-tab-example" style={{marginTop:20,margin:10,backgroundColor:"rgb(245, 245, 245)"}} onClick={() => setOpen(!open)}>
                                    <Tab eventKey="home" title="Last 12 Months" style={{margin:10}} >
                                        <Dev_Performance_default/>
                                    </Tab>
                                    <Tab eventKey="filters" title="Add Filters" style={{margin:10}} >
                                        <Collapse in={open}>
                                                <div id="example-collapse-text" >
                                                    <center>
                                                        <h6>Apply Filters</h6>
                                                    </center>
                                                </div>
                                        </Collapse>
                                        <DevPerformanceFiltering/>
                                    </Tab>
                                </Tabs>                           
                        </div>                      
                    </div>                  
                <div>
                <div style={{marginBottom:20}}>    </div>   
                <hr className="bg-dark" style={{marginTop:20}}/>
                <h5 style={{marginBottom:20}}><AiOutlineBarChart size={30}/>{' '}  Total Bugs along with the related month  </h5>                        
                        <Row style={{marginBottom:20 }}> 
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                     <Month_BugDev/>          
                            </div>
                        </Row> 
                <hr className="bg-dark" style={{marginTop:50}}/>

                <div style={{marginBottom:20}}> </div>         
               
                <h5 style={{marginBottom:20}}>  <HiOutlineDocumentReport size={30}/>{' '} Total Bugs along with the Projects  </h5>                        
                        <Row style={{marginBottom:20 }}> 
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                    <ProjectBugDev/>
                            </div>
                        </Row> 
                <hr className="bg-dark" style={{marginTop:50}}/>                  
            </div>                   
        </div>
    )
}

export default ProjectReportDashboard;