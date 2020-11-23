import React from "react";
import {Form, CardDeck, Card } from "react-bootstrap";

export default function Filters({ params, onInputChange }) {
    return (
        <Form className="mr-3 mt-3 ml-3 mb-3">

            <CardDeck>

                <Card>
                    <Card.Body>
                        <Form.Label>Priority</Form.Label>
                        <Form.Control className="mb-3" as="select" size="sm" onChange={onInputChange} value={params.priority} name="priority">
                            <option>All</option>
                            <option>urgent</option>
                            <option>high</option>
                            <option>medium</option>
                            <option>low</option>
                        </Form.Control>
                        <Form.Label>Severity</Form.Label>
                        <Form.Control as="select" size="sm" onChange={onInputChange} value={params.severity} name="severity">
                            <option>All</option>
                            <option>critical</option>
                            <option>high</option>
                            <option>medium</option>
                            <option>low</option>
                        </Form.Control>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Form.Label>Bug Type</Form.Label>
                        <Form.Control className="mb-3" as="select" size="sm" onChange={onInputChange} value={params.bugtype} name="bugtype">
                            <option>All</option>
                            <option>Functional</option>
                            <option>Performance</option>
                            <option>Usability</option>
                            <option>Compatibility</option>
                            <option>Security</option>
                        </Form.Control>
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" size="sm" onChange={onInputChange} value={params.workstate} name="workstate">
                            <option>All</option>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Review</option>
                            <option>Done</option>
                        </Form.Control>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Form.Label>QA Review</Form.Label>
                        <Form.Control className="mb-3" as="select" size="sm" onChange={onInputChange} value={params.review} name="review">
                            <option>All</option>
                            <option>Reviewed</option>
                            <option>Not Reviewed</option>
                        </Form.Control>
                    </Card.Body>
                </Card>
            </CardDeck>
{/* 
            <Form.Row className="mt-5">
                <Form.Group as={Col}>
                    <Form.Control
                        className="mL-20"
                        onChange={onInputChange}
                        value={params.Issue_Name}
                        type="text"
                        name="Issue_Name"
                        placeholder="Search here"
                    />
                </Form.Group>
            </Form.Row> */}

        </Form>
    );
}
