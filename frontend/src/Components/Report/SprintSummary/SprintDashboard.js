import React, { useState, useEffect, } from 'react';
import { Table, Row, Col, Button, Card, NavLink, Form, FormControl, Modal, Badge, ProgressBar } from 'react-bootstrap';
import { buildQueries, render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams } from "react-router-dom";
import MaterialTable from 'material-table'
import Tooltip from '@material-ui/core/Tooltip';
import getSprintSummary from '../../../Services/Reports/SprintSummaryService'
import SprintModal from './SprintSummaryModal';
import {SiSprint} from 'react-icons/si'



function SprintDashboard() {

    const [isModelOpen, setisModelOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false)
    const initial = {
        "id": '',
        "finished": '',
        "total": '',
        "active": '',
        "estimated_hours": '',
        "actual_hours": '',
        "name": '',
        "status": '',
        "startdate": '',
        "intialenddate": "",
        "enddate": "",
        "is_deleted": '',
        "createdby": '',
        "project": '',
        "ticketlist": []
    }
    const [sprintlist, setsprintlist] = useState([])
    function assignsort(list) {
        for (let i = 0; i < list.length; i++) {
            switch (list[i].priority) {
                case "Urgent":
                    list[i].priorityid = 1;
                    break;
                case "High":
                    list[i].priorityid = 2;
                    break;
                case "Medium":
                    list[i].priorityid = 3;
                    break;
                case "Low":
                    list[i].priorityid = 4;
                    break;
            }
            switch (list[i].severity) {
                case "Critical":
                    list[i].severityid = 1;
                    break;
                case "High":
                    list[i].severityid = 2;
                    break;
                case "Medium":
                    list[i].severityid = 3;
                    break;
                case "Low":
                    list[i].severityid = 4;
                    break;
            }
        }
    }

    async function getSprints() {
        setisLoading(true)
        let b = await getSprintSummary();
        assignsort(b)
        setsprintlist(b)
        setisLoading(false)
    }

    useEffect(() => {

        let isMounted = true; // cleanup mounting warning
        getSprints();

        return () => { isMounted = false }
    }, [])

    function sprintdetails(e) {
        for (var i = 0; i < sprintlist.length; i++) {
            if (sprintlist[i].id === e) {
                render(<SprintModal
                    name={sprintlist[i].name}
                    total={sprintlist[i].total}
                    sdate={sprintlist[i].startdate}
                    active={sprintlist[i].active}
                    edate={sprintlist[i].intialenddate}
                    compleated={sprintlist[i].finished}
                    ehours={sprintlist[i].estimated_hours}
                    ahours={sprintlist[i].actual_hours}
                    ticketlist={sprintlist[i].ticketlist}

                />);
            }
        }

    }

    if (sprintlist != null) {
        return (
            <div>
                <div className="row" style={{ paddingTop: 5 }}>
                    <div className="col-md-6">
                        <Card.Title><h2> <SiSprint size={45} />{' '}<b>Sprint Summary</b></h2></Card.Title>
                    </div>
                    <div className="col-md-6">
                        <div className="p-2 mb-1">

                        </div>
                    </div>
                </div>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <MaterialTable
                    columns={
                        [{ title: 'Id', field: 'id' },
                        { title: 'Sprint', field: 'name' },
                        { title: 'Start date', field: 'startdate', field: 'enddate' },
                        {
                            title: 'Progress', render: rowData =>
                                <ProgressBar>
                                    <ProgressBar striped variant="success" now={rowData.finished / rowData.total * 100} key={1} label={"Finished : ", rowData.finished} />
                                    <ProgressBar striped variant="danger" now={rowData.active / rowData.total * 100} key={2} label={"Active : ", rowData.active} />
                                </ProgressBar>
                        }]
                    }
                    data={sprintlist}
                    title="sprints"
                    onRowClick={(event, rowData) => { sprintdetails(rowData.id) }}
                    isLoading={isLoading}
                />

            </div>
        )
    }
    else {
        return (
            <div>
                <div className="row" style={{ paddingTop: 5 }}>
                    <div className="col-md-6">
                        <Card.Title><h2> <SiSprint size={45} />{' '}<b>Monthly Bug Summary</b></h2></Card.Title>
                    </div>
                    <div className="col-md-6">
                        <div className="p-2 mb-1">

                        </div>
                    </div>
                </div>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <MaterialTable
                    columns={
                        [{ title: 'Id' },
                        { title: 'Sprint' },
                        { title: 'Start date' },
                        { title: 'Progress' }]
                    }
                    data={sprintlist}
                    title="sprints"
                />

            </div>
        )
    }




}


export default SprintDashboard;