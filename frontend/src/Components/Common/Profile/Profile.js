import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { authenticationService } from '../../../Services/LoginService'
import { userService } from '../../../Services/UserService'
import profile_image from '../../../Assets/unnamed.jpg'

function Profile() {

    const [user, setUser] = useState([])

    useEffect(()=>{

        const role = authenticationService.userRole

        if(role == "Customer"){
            userService.GetExternalUser(authenticationService.userID)
            .then(function(response){
                setUser(response.data)
            })
        }else if(role != "Admin"){
            userService.GetInternalUser(authenticationService.userID)
            .then(function(response){
                setUser(response.data)
            })
        }else{
            setUser(
                {
                    first_name: authenticationService.userName,
                    last_name: "",
                    color: "light",
                    email: authenticationService.email,
                    role: authenticationService.userRole
                }
            )
        }
    },[])


    return (
        <div class="bg-white shadow rounded overflow-hidden">

            <div class="px-4 pt-0 pb-4 bg-dark">
                <div class="media align-items-end profile-header">
                    <div class="profile mr-3 mt-3"><img src={profile_image} alt="..." width="130" class="rounded mb-2 img-thumbnail" /></div>
                    <div class="media-body mb-5 text-white">
                        <h4 class="mt-0 mb-0">{user.first_name + " " + user.last_name}</h4>
                        <p class="small mb-1">{user.email}</p>
                        <Badge pill variant={user.color}>{user.role}</Badge>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile