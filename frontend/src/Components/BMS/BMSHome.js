import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { authenticationService } from '../../Services/LoginService';
import { projectService } from '../../Services/ProjectService';
import Preloader from '../Common/Preloader/Preloader';
import  './BMSHome.scss'


function BMSHome(props){

    const history = useHistory()
    const state = projectService.GetProjectList()

    localStorage.removeItem("projectID")

    return (
        <div class="container h-100">
            {! state.loading && ! state.error && <div class="row">
                {state.projects.map(project => (
                <div class="col-md-6 col-lg-4 column">
                    <div class="cardF gr-1">
                        <div class="txt trimTextBMS">
                            <h1>{project.projectname}</h1>
                            <p>{project.description}</p>
                        </div>
                        <NavLink to={"/"+ authenticationService.userRole +"/IssueBacklogBMS/" + project.id}>
                            <i class="fas fa-external-link-alt"></i>
                        </NavLink>
                    </div>
                </div>
                ))}
            </div>}

            { state.loading && <div>

              <Preloader/>

            </div>}

            { state.error && <div>

                {history.push('/error')}

            </div>}

        </div>
  )
}

export default BMSHome;