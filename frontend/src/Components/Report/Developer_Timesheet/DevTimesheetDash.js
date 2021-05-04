import React, {useState} from 'react'
import { Collapse,Badge, Tabs, Tab} from 'react-bootstrap'
import {GrTableAdd} from 'react-icons/gr'
import {MdVerifiedUser} from 'react-icons/md'
import AlldataTable from './AllDataTable/AlldataTable'
import "jspdf-autotable";
import FilreredData from './FilteredTable/FilreredData';

function TimesheetDashboard() {

//-----------------For Collapse-------------------
const [open, setOpen] = useState(false);


    return (
        <div>
            <div className="row">
                <div className="col-md-12">   
                    <div className="" style={{marginTop:20}}>
                        <div className="row">
                            <div className="col-md-1">
                                <GrTableAdd size={60} style={{paddingTop:10}}/>
                            </div>
                            <div className="col-md-6" style={{marginRight: 20}}>
                                <div className="row">
                                    <h2>Developer / Project Timesheet</h2>
                                </div>
                                <div className="row"> 
                                    <Badge pill variant="dark">
                                            Table View
                                    </Badge>{' '} <MdVerifiedUser/>
                                </div>         
                            </div>
                            <div className="col-md-4">
                                    <div className="" style={{float: 'right', marginTop: 10}}></div>
                            </div>
                        </div>
                    </div>
                        <div style={{marginTop:10}}>
                            <div>
                                <hr className="bg-dark" style={{marginBttom:20}}/>
                                    <Tabs  defaultActiveKey="home" id="uncontrolled-tab-example" style={{margin:10 , paddingTop:20}} style={{marginTop:20,backgroundColor:"rgb(250, 250, 250)"}}  onClick={() => setOpen(!open)}>
                                        <hr/>
                                            <Tab eventKey="home" title="All Data" style={{margin:10} } >
                                                <AlldataTable/>
                                            </Tab>
                                            <Tab eventKey="filters" title="Add Filters" style={{margin:10}} >
                                                <Collapse in={open}>
                                                    <div id="example-collapse-text" >
                                                        <center><h6> Developer/Project Timesheet under different categories</h6></center>
                                                    </div>
                                                </Collapse>
                                                <FilreredData /> 
                                            </Tab>           
                                    </Tabs>
                            </div>     
                        </div>
                    </div> 
            </div>
        </div>
    )
}

export default TimesheetDashboard
