import React, {useState,useEffect} from 'react'
import { Card ,Button, Collapse,Badge} from 'react-bootstrap'
import { BrowserRouter, Link, Route, Switch, NavLink } from 'react-router-dom';
import {GrTableAdd} from 'react-icons/gr'
import AlldataTable from './AllDataTable/AlldataTable'
import "jspdf-autotable";
import FilreredData from './FilteredTable/FilreredData';
import NavBar from '../../Common/Navbar/NavBar';

function TimesheetDashboard() {

//-----------------For Collapse-------------------
const [open, setOpen] = useState(false);


    return (
        <div>
            <NavBar/>
          <div className="row">
             
              <div className="col-md-12">
                
              <Card className="shadow-lg p-3 mb-5  rounded " >
                  <div className="row">
                      <div className="col-md-1">
                          
                          <GrTableAdd size={40} style={{paddingTop:10}}/>
                      </div>
                      <div className="col-md-6" style={{marginRight: 20}}>
                         
                          
                          <div className="row"><h5>Developer Timesheet</h5></div>
                          <div className="row"> 
                          <Badge pill variant="dark">
                          Table View
                          </Badge>{' '} 
                          </div>
                        
                        
                      </div>
                      <div className="col-md-4">
                          <div className="" style={{float: 'right', marginTop: 10}}>
                          
                        
                          </div>
                        
                      </div>
                  </div>
                  </Card>
                  <div className="">
                 <div className="">
                {/* Collapse */}
               
                 </div>
                 
               
                </div>
                  <div style={{marginTop:10}}>
                  <Card className="shadow p-3 mb-3 bg-white rounded" >
                      {/* <DevTable></DevTable> */}
                      <div>

                      <BrowserRouter>
                      <nav>
                        
                      <NavLink to="/Manager/DeveloperTimesheet/AlldataTable">
                              <Button className="btn-dark"
                               onClick={() => setOpen(!open)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open}>
                              All Data</Button>
                           
                            {'  '}
                            </NavLink>
                            
                            <NavLink to="/Manager/DeveloperTimesheet/FilteredTable">
                            <Button className="btn-info"
                              onClick={() => setOpen(!open)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open}>
                              Add Filters 
                            </Button>
                            
                                <Collapse in={open}>

                                    <div id="example-collapse-text" >
                                    {/* Add form   */}
                                    <center>
                                   
                                      
                                        <h6> Developer Timesheet under different categories       
                                        </h6>
                                    
                                    </center>
                                   
                                    </div>


                                    </Collapse>
                            </NavLink>
                      </nav>
                      <Switch>
                        
                        <Route path="/Manager/DeveloperTimesheeet">
                          <AlldataTable />
                        </Route>
                         
                        <Route path="/Manager/DeveloperTimesheet/AlldataTable">
                          <AlldataTable />
                        </Route>
                        <Route path="/Manager/DeveloperTimesheet/FilteredTable">
                          <FilreredData />
                        </Route>
                      </Switch>
                    </BrowserRouter>

                      </div>
			
                    </Card>           
                  </div>
                  </div> 
              </div>

        </div>
    )
}

export default TimesheetDashboard
