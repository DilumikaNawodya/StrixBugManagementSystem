import React, { useState } from 'react';
import { Card, Container, Badge, Col, Row, Button, Modal } from 'react-bootstrap'
import CommentSection from '../../../Common/Comment/CommentSection';


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
            <ul>
                {attach.map((attach, index) => (<li><a href={attach.files}>Attachment{index}</a></li>))}
            </ul>)
    }
    else {
        return (<div></div>);
    }
}

function IssueCard(props) {
    console.log(props)
    const [modalopen, setmodalopen] = useState(true)
    return (
        <Modal size="xl" show={modalopen} >
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Card className='p-2 b-2'>
                                <Row>
                                    <Col>
                                        <h5>Project : {props.name}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5>Type: <span style={{ color: 'gray' }}>{props.type} </span></h5>
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
                                <div style={{ width: '100%', height: 'auto' }}>
                                    <Col><h4>Attachments</h4></Col>
                                </div>
                                <div style={{ width: '100%', height: 'auto', display: 'flex' }}><Attachments attach={props.attachment} /></div>
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

                        </Col>

                    </Row>

                    <Row>
                        <Col style={
                            {
                                padding: '20px',
                            }}>
                            <CommentSection tid={props.id} />
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