import React from 'react'
import { Card, Badge } from 'react-bootstrap'


function ProjectDetailCard({data}){
    return(
        <div class="container-fluid">

                <div class="card-body ">
        
                        <div class="row">
                            <div class="col-4">
                                <h4 class="card-title"><b>{data.projectname}</b></h4>
                                <span class="font-weight-bold">{data.description}</span> 
                            </div>
                            <div class="col-4">
                                <Card className="text-light shadow rounded color-block" style={{backgroundColor:"#414345"}}>
                                    <Card.Body>
                                        <center>
                                        <h4><b>Total Users: <Badge  pill variant="success">{data.user_count}</Badge></b></h4>
                                        </center>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div class="col-4">
                                <Card className="text-light shadow rounded color-block" style={{backgroundColor:"#414345"}}>
                                    <Card.Body>
                                        <center>
                                        <h4><b>Total Tickets: <Badge  pill variant="success">{data.ticket_count}</Badge></b></h4>
                                        </center>
                                    </Card.Body>
                                </Card> 
                            </div>
                        </div>
                   
                </div>
        </div>
    )
}


export default ProjectDetailCard