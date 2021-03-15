import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { projectService } from '../../../Services/ProjectService';
import Preloader from '../../Common/Preloader/Preloader';
import  './BMSHome.scss'

function BMSHome(props){

    const history = useHistory()
    const state = projectService.GetProjectList()
    projectService.removeCurrentProject()

    const handleProject = (pid) => {
        projectService.setCurrentProject(pid)
        history.push('/issuebacklogbms')
    }


    return (
        <div class="container h-100">
            {! state.loading && ! state.error && <div class="row">
                {state.projects.map(project => (
                <div class="col-md-6 col-lg-4 column">
                    <div class="cardF gr-1">
                        <div class="txt trimTextBMS mb-3">
                            <h1>{project.projectname}</h1>
                            <p>{project.description}</p>
                        </div>
                        <button class="btn btn-sm btn-white" onClick={() => handleProject(project.id)}>
                            <i class="fas fa-external-link-alt"></i>
                        </button>
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