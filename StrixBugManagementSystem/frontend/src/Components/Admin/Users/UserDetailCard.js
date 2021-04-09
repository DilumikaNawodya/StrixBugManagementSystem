import React from 'react'
import { Card, Badge } from 'react-bootstrap'


function UserDetailcard({data, type}){
    return(
        <div class="container-fluid">

                <div class="card-body ">
        
                        <div class="row">
                            <div class="col-4">
                                <h4 class="card-title"><b>{data.first_name + " " + data.last_name}</b></h4>
                                <h6 class="card-subtitle mb-2 text-muted">
                                    <span class={"badge badge-"+data.color}>{data.role}</span> 
                                </h6>
                                <span class="font-weight-bold">{data.email}</span> 
                            </div>
                            <div class="col-4">
                                <Card className="text-light shadow rounded color-block" style={{backgroundColor:"#414345"}}>
                                    <Card.Body>
                                        <center>
                                        <h4><b>{(data.role == "Customer" || data.prev_role == "Customer") ? "Total Projects: " : "Total Assigned Projects: "} <Badge  pill variant="success">{data.project_count}</Badge></b></h4>
                                        </center>
                                    </Card.Body>
                                </Card>
                            </div>
                            {(data.role == "Customer" || data.prev_role == "Customer")  && <div class="col-4">
                                <Card className="text-light shadow rounded color-block" style={{backgroundColor:"#414345"}}>
                                    <Card.Body>
                                        <center>
                                        <h4><b>Total Tickets: <Badge  pill variant="success">{data.ticket_count}</Badge></b></h4>
                                        </center>
                                    </Card.Body>
                                </Card> 
                            </div>}
                        </div>
                   
                </div>
        </div>
    )
}


export default UserDetailcard