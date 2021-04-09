import React, { useState } from 'react';
import { Card, Container, Badge, Col, Row, Button, Modal } from 'react-bootstrap'
import MaterialTable from 'material-table'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';



function SprintModal(props) {
    const [modalopen, setmodalopen] = useState(true)

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
    function bagetype(priority) {

        switch (priority) {
            case 'Urgent':
                return 'danger';
            case 'High':
                return 'warning';
            case 'Medium':
                return 'primary'
            case 'Low':
                return 'success'
        }
    }
    function severitytype(severity) {

        switch (severity) {
            case 'Critical':
                return (<Tooltip title="Critical"><ArrowUpwardIcon style={{ color: "#dc3545" }} /></Tooltip>);
            case 'High':
                return (<Tooltip title="High"><ArrowUpwardIcon style={{ color: "#ffc107" }} /></Tooltip>);
            case 'Medium':
                return (<Tooltip title="Medium"><ArrowDownwardIcon style={{ color: "#007bff" }} /></Tooltip>);
            case 'Low':
                return (<Tooltip title="Low"><ArrowDownwardIcon style={{ color: "#28a745" }} /></Tooltip>);
        }
    }


    return (
        <Modal size="xl" show={modalopen} >
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h5>Sprint : {props.name}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Total: <span><Badge variant="primary">{props.total} </Badge></span></h5>
                                </Col>
                                <Col>
                                    <h5 >Start date:<span>{props.sdate}</span></h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Active : <span><Badge variant="warning">{props.active} </Badge></span></h5>
                                </Col>
                                <Col>
                                    <h5>End date : <span>{props.edate}</span></h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Completed : <span><Badge variant="success">{props.compleated} </Badge></span></h5>
                                </Col>
                            </Row>
                        </Col>

                        <Col >
                            <Row>
                                <Col style={
                                    {

                                        border: '1px solid gray',
                                        padding: '20px'
                                    }
                                }>
                                    <h5>Estimated hours:{props.ehours} hrs. </h5>
                                    <h5>Actual hour:{props.hours} hrs. </h5>

                                </Col>

                            </Row>
                            <Row>
                                <Col style={
                                    {
                                        padding: '20px',
                                    }}  >
                                </Col>
                            </Row>

                        </Col>

                    </Row>

                    <Row>
                        <Col style={{
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <MaterialTable
                                columns={[
                                    { title: 'Id', field: 'id' },
                                    { title: 'Title', field: 'issuename' },
                                    { title: "Date", field: "date", },
                                    { title: 'Priority', field: 'priority', render: rowData => <Badge variant={bagetype(rowData.priority)}>{rowData.priority}</Badge>, customSort: (a, b) => a.priorityid - b.priorityid },
                                    { title: 'Severity', field: 'severity', render: rowData => severitytype(rowData.severity), customSort: (a, b) => a.severityid - b.severityid }

                                ]}
                                data={props.ticketlist}
                                title="Issues"
                                detailPanel={rowData => {
                                    return(
                                        <Container>
                                        <Row>
                                            <Col>
                                                <h5>Summary</h5>
                                                <Card className='mb-2'>
                                                    <Card.Body>{rowData.issuedescription}</Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row>

                                        </Row>
                                    </Container>
                                    )
                                }}
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col style={{
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button onClick={() => setmodalopen(false)}>Close</Button>
                        </Col>
                    </Row>
                </Container>

            </Modal.Body>


        </Modal>

    )
}
export default SprintModal;