import React, {useState} from 'react'
import { Card, Badge } from 'react-bootstrap'
import { userService } from '../../../Services/UserService'
import Swal from 'sweetalert2'

function UserDetailcard({ data }) {

    const [checked, setCheck] = useState(data.role == "Block" ? false:true)

    function handleChange(e){
        setCheck(!checked)
        userService.UpdateBlockedUser(data.id)
        .then(function (response) {
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: response.data.data,
                showConfirmButton: true,
                timer: 5000
            }).then(function () {
                window.location.reload(true)
            })
        })
        .catch(function (error) {
            Swal.fire({
                position: 'middle',
                icon: 'warning',
                title: error.response.data.data,
                showConfirmButton: true,
                timer: 5000
            }).then(function () {
                window.location.reload(true)
            })
        })
    }


    return (
        <div class="container-fluid">
            <div class="card-body ">
                <div class="row">

                    <div class="col-3">
                        <h4 class="card-title"><b>{data.first_name + " " + data.last_name}</b></h4>
                        <h6 class="card-subtitle mb-2 text-muted">
                            <span class={"badge badge-" + data.color}>{data.role}</span>
                        </h6>
                        <span class="font-weight-bold">{data.email}</span>
                    </div>

                    <div class="col-3">
                        <span class="row font-weight-bold">Change Role</span>
                        <label class="row switch mt-3" for={"checkbox"+data.id}>
                            <input type="checkbox" id={"checkbox"+data.id} name="checkbox" checked={checked} onChange={handleChange}/>
                            <div class="slider round"></div>
                        </label>
                    </div>

                    <div class="col-3">
                        <Card className="text-light shadow rounded color-block" style={{ backgroundColor: "#414345" }}>
                            <Card.Body>
                                <center>
                                    <h4><b>{data.role == "Customer" ? "Total Projects: " : "Total Assigned Projects: "} <Badge pill variant="success">{data.project_count}</Badge></b></h4>
                                </center>
                            </Card.Body>
                        </Card>
                    </div>

                    {(data.role == "Customer" || data.prev_role == "Customer") && <div class="col-3">
                        <Card className="text-light shadow rounded color-block" style={{ backgroundColor: "#414345" }}>
                            <Card.Body>
                                <center>
                                    <h4><b>Total Tickets: <Badge pill variant="success">{data.ticket_count}</Badge></b></h4>
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