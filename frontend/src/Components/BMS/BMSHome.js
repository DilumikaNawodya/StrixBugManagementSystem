import React from 'react';
import { useHistory } from 'react-router-dom';
import GetProjectList from '../../Services/ProjectService';
import  './BMSHome.scss'



function BMSHome(props){

    const history = useHistory()
    const state = GetProjectList()
        
    return (
        <div class="container h-100">
            {! state.loading && ! state.error && <div class="row">
                {state.projects.map(project => (
                <div class="col-md-6 col-lg-4 column">
                    <div class="card gr-1 trimTextBMS">
                        <div class="txt">
                            <h1>{project.projectname}</h1>
                            <p>{project.description}</p>
                        </div>
                        <a href="#">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
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

export default BMSHome;