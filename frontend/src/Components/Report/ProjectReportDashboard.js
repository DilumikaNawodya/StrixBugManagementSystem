import React from 'react';
import { Card } from 'react-bootstrap';
import Calender from './Calender'
import ActiveWeekdaysBar from './Charts/ActiveWeekdaysBar';
import IssuesWeekdays from './Charts/IssuesWeekdays';
import SolvedRatio from './Charts/SolvedRatio';
import TotalIssuesPieCharts from './Charts/TotalIssuesPieChart';
import TotalHours from './DataReport/TotalHours';
import TotalProjDevQA from './DataReport/TotalProjDevQA'

function ProjectReportDashboard(){
    return(
            <div class="container mb-5">
            <div className="row" style={{ paddingTop: 5 }}>
                <div className="col-md-6">
                    <Card.Title><h2>Bug Report Dashboard</h2><hr/>Overrall Summary</Card.Title>
                </div>
                <div className="col-md-6">
                    <div className="p-2 mb-1">
                        <div className="row">
                            <div className="col" style={{}}>
                                From
                                <small><Calender/></small>
                            </div>
                            <div className="col">
                                To
                                <small><Calender/></small>
                            </div>
                            <div className="col" style={{}}>
                                <button className="btn btn-md btn-outline-dark">Filter by Date</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-7">
                    <div className="row" style={{ paddingTop: 5 }}>
                        <div className="col-md-6"  >
                            <Card className="shadow-lg p-1 mb-2 bg-white rounded" style={{ height: 253 }}>
                                <TotalProjDevQA/>
                            </Card>
                        </div>
                        <div className="col-md-6"  >
                            <div className="col"  >
                                <Card className="shadow-lg p-1 mb-1 bg-white rounded" >
                                    <center><b>Total Hours</b></center>
                                    <TotalHours/>
                                </Card>
                                <Card className="shadow-lg p-1 mb-1 bg-white rounded">
                                    <SolvedRatio/>
                                </Card>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="col-md-5" style={{ paddingTop: 5 }}>
                    <Card className="shadow-lg p-2 mb-1 bg-white rounded" style={{ height: 253 }} >
                        <div className="">
                            <center>
                                <IssuesWeekdays/>
                            </center>

                        </div>
                    </Card>
                </div>

            </div>
            <div className="row">
                <div className="col-md-7">
                    <Card className="shadow-lg p-2 mb-1 bg-white rounded">
                        <div className=""
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}>

                            <center>
                                <TotalIssuesPieCharts/>
                            </center>
                        </div>
                    </Card>
                </div>
                <div className="col-md-5">

                    <Card className="shadow-lg p-2 mb-1 bg-white rounded" style={{ height: 313 }}>
                        <div className="" style={{ width: 350 }}>
                            <center><ActiveWeekdaysBar/></center>
                        </div>
                    </Card>


                </div>

            </div>
            </div>
    )
}

export default ProjectReportDashboard;