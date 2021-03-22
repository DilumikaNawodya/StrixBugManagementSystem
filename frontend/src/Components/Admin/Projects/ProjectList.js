import React from 'react';
import { useHistory } from 'react-router';
import { projectService } from '../../../Services/ProjectService';


function ProjectList(){
    
    const history = useHistory()
    const state = projectService.GetProjectList()
    projectService.removeCurrentProject()

    const handleProject = (pid) => {
        projectService.setCurrentProject(pid)
        history.push('/access')
    }

    return(
        <div class="container h-100">
            <div class="row">
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
            </div>
        </div>
    )
}

export default ProjectList