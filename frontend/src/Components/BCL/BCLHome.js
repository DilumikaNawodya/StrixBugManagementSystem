import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import GetProjectList from '../../Services/ProjectService';
import  './BCLHome.scss'



function BCLHome(props){

    const history = useHistory()
    const state = GetProjectList()

    return (
        <div class="container h-100">
            {! state.loading && ! state.error && <div class="row">
                {state.projects.map(project => (
                <div class="col-md-6 col-lg-4 column">
                    <div class="cardF gr-1">
                        <div class="txt trimTextBCL">
                            <h1>{project.projectname}</h1>
                            <p>{project.description}</p>
                        </div>
                        <NavLink to={"/Customer/IssueBacklog/" + project.id}>
                            <i class="fas fa-external-link-alt"></i>
                        </NavLink>
                    </div>
                </div>
                ))}
            </div>}

            { state.loading && <div>

                Hi its me

            </div>}

            { state.error && <div>

                {history.push('/error')}

            </div>}

        </div>
  )
}

export default BCLHome;