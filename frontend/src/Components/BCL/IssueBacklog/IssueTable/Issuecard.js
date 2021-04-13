import React, { useState } from 'react';
import { Card, Container, Badge, Col, Row, Button, Modal,Image } from 'react-bootstrap'
import Comment from './Comment'

function Attachments({ attach }) {
    if (attach != null) {
        // return(attach.map((attach)=>
        //     (<a href={attach.files} target="_blank"><img src={attach.files} style={{height:'50px',widows:'50px',objectFit:"cover"}}/></a>)
        //     // (<ul>
        //     //     <li><a href={attach.files}>{attach.files}</a></li>
        //     // </ul>)
        // ))
        let i = 0;
        return (
            // <ul>
            //     {attach.map((attach, index) => (<li><a href={attach.files}>Attachment{index}</a></li>))}
            // </ul>
            <Row style={{overflow:'scroll'}}>
            {attach.map((attach, index) => (<Col className='m-0 p-0'>
                
            <a href={attach.files}><Image src={attach.files} height='100' width='100' rounded /></a>
            </Col>))}
            </Row>
            )
            
    }
    else {
        return (<div></div>);
    }
}

function IssueCard(props) {
    const [modalopen, setmodalopen] = useState(true)
    return (
        <Modal size="xl" show={modalopen} >
            <Modal.Body>
                <Container>
                    {/* <Row>
                        <Col>
                            <Card className='p-2 b-2'>
                            <Row>
                                <Col>
                                    <h5>Project : {props.name}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Type: <span style={{color:'gray'}}>{props.type} </span></h5>
                                </Col>
                                <Col>
                                    <h5 >Status:<span>{props.status}</span></h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Priority : <span><Badge variant={props.variant}>{props.priority}</Badge></span></h5>
                                </Col>
                                <Col>
                                    <h5>Severity : <span>{props.severity}</span></h5>
                                </Col>
                            </Row>
                            </Card>
                            <Row>
                                <Col>
                                    <h5>Summery</h5>
                                    <Card>
                                        <Card.Body>{props.summary}</Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Row style={
                                {
                                    marginTop: '10px',
                                    marginLeft: '0px',
                                    marginRight: '0px',
                                    height: '100px',
                                    padding: '10px',
                                    border: '1px solid gray'
                                }
                            }>
                                <div style={{width:'100%',height:'auto'}}>
                                    <Col><h4>Attachments</h4></Col>
                                </div>
                                <div style={{width:'100%',height:'auto', display:'flex'}}><Attachments attach={props.attachment}/></div>    
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
                                    <h5>Assignee: </h5>
                                    <h5>Reporter:{props.reporter} </h5>
                                    <h5>Created:{props.created} </h5>
                                    <h5>Updated: </h5>
                                </Col>

                            </Row>
                            <Row>
                                <Col style={
                                    {
                                        padding: '20px',
                                    }}  >
                                    <Comment />
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
                            <Button onClick={() => setmodalopen(false)}>Close</Button>
                        </Col>
                    </Row> */}

                    <Row>
                        <Col><h4>{props.name}</h4></Col>
                    </Row>
                    <hr style={{ color: 'lightgray', marginTop: '3px' }} />
                    <Row>
                        <Col className='mt-4'>
                            <Row>
                                <Col>
                                    <h6 style={{ color: 'gray', marginBottom: '5px' }}>Type : </h6>
                                    <h5 style={{paddingLeft:'10px'}}>{props.type}</h5>
                                </Col>
                                <Col>
                                    <h6 style={{ color: 'gray', marginBottom: '5px' }}>Status : </h6>
                                    <h5 style={{paddingLeft:'10px'}}>{props.status}</h5>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col>
                                    <h6 style={{ color: 'gray', marginBottom: '5px' }}>Priority : </h6>
                                    <h5 style={{paddingLeft:'10px'}}><span><Badge variant={props.variant}>{props.priority}</Badge></span></h5>
                                </Col>
                                <Col>
                                    <h6 style={{ color: 'gray', marginBottom: '5px' }}>Severity :  </h6>
                                    <h5 style={{paddingLeft:'10px'}}><span>{props.severity} {props.severity_icon}</span></h5>
                                </Col>
                            </Row>
                            <Row className='mt-5'>
                                <Col className='col-2'><h6><b>Description</b></h6> </Col>
                                <Col><hr style={{ color: 'lightgray', marginTop: '0.5em' }} /></Col>
                            </Row>
                            <Row>
                                <Col><h6 style={{paddingLeft:'10px'}}>{props.summary}</h6></Col>
                            </Row>
                            <Row className='mt-5'>
                                <Col className='col-2'><h6><b>Attachments({props.attachment.length})</b></h6> </Col>
                                <Col><hr style={{ color: 'lightgray', marginTop: '0.5em' }} /></Col>
                            </Row>
                            {/* <Row style={{overflow:'auto'}}>
                                <Attachments attach={props.attachment}/>
                            </Row> */}
                            <Attachments attach={props.attachment}/>
                        </Col>
                        <Col>
                            
                                <Row className='mt-4'>
                                    <Col>
                                        <h6 style={{ color: 'gray', marginBottom: '5px' }}>Reporter :  </h6>
                                        <h5 style={{paddingLeft:'10px'}}>{props.reporter}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h6 style={{ color: 'gray', marginBottom: '5px' }}>Date :  </h6>
                                        <h5 style={{paddingLeft:'10px'}}>{props.created}</h5>
                                    </Col>
                                </Row>
                            
                            <Row className='mt-4'>
                                <Col className='col-2'><h6><b>Comments</b></h6> </Col>
                                <Col><hr style={{ color: 'lightgray', marginTop: '0.5em' }} /></Col>

                            </Row>
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
export default IssueCard;