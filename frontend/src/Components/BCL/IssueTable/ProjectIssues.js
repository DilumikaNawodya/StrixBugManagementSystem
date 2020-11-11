import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Link, Switch } from "react-router-dom";
import {Table,Row,Col,Button,Card,NavLink,Form, FormControl} from 'react-bootstrap';
//import Pagination from './Pagination';
export default class ProjectIssues extends Component {
    render() {
        return (
            <div className="">
          
                <Row >
                <div className="col-md-2 bg-dark">
                <Col  className=" text-white  ">
                
                <Row> <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist"> LOGO</NavLink>
               </Row>
               <Row> <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist">  Summary</NavLink>
               </Row>
               <Row> <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist"> Dashboard</NavLink>
               </Row>
               <Row> <NavLink className="d-inline p-2 bg-dark text-white" to="/Projectlist"> Reports </NavLink>
               </Row>
    
               
                
                </Col>
                
                </div>
                <div className="ml-2 mt-2 col-md-9">
                <Col className="">
                     <Row className="">                                
                <Card>
                    <Card.Body>
                        <Card.Title>Project 1</Card.Title>
                            <Card.Text>
                                Description <br></br>
                                Project Name, ID, 
                                Customer ID
                             </Card.Text>
   
                    </Card.Body>
                </Card> 
                     </Row>
                     <Row className="border border-dark mt-2 mb-2" >
                        <div className="d-flex p-2 bd-highlight">
                            <Col md={4}>
                              
                            <Link to="BclNext/ProjectIssues">  
                                 <Button className="mr-sm-2" variant="info"  data-toggle="tooltip" title="Go to issues">Add Issue</Button>
                            </Link>
                            </Col>
                            <Col md={3}>
                            <Link to="BclNext/ProjectIssues">  
                                 <Button variant="dark"  data-toggle="tooltip" title="Go to issues">Sort By</Button>
                            </Link>
                            </Col>
                            <Col md={5}>
                            <Form inline>
                                  <FormControl type="text" placeholder="Search" className="mr-sm-2" /> {/* Margin right(Padding , Small and up by 2) */}
                                      </Form>
                            </Col>
                            </div>
                     </Row>
                     <Row>
                     <Table striped bordered hover>
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th>Issue</th>
      <th>Tag</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td>Issue 1</td>
      <td>Tag 1</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>Issue 2</td>
      <td>Tag 2</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td >Issue 3</td>
      <td>Tag 3</td>
    </tr>
  </tbody>
</Table>
                        </Row>
                      
                 

                    <Row >
                    
                    <div>
                    <Card className=" mu-2">
                    <Card.Body>
                     
                            <Card.Text>
                                pagination
                             </Card.Text>
   
                    </Card.Body>
                </Card>
                    </div>    
                     </Row>
                </Col>
                </div>
                </Row>
               
            </div>
        )
    }
}
