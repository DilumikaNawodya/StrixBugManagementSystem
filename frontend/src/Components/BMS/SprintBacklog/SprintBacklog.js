import React, { useState } from 'react';
import SetPagination from '../../Common/Pagination/Pagination';
import './SprintBacklog.scss';

function SprintBacklog() {
    const sprints = ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4", "Sprint 5", "Sprint 6", "Sprint 7", "Sprint 8", "Sprint 9", "Sprint 10"]
    const [currentPage, setCurrentPage] = useState(1);
    const [SprintsPerPage, setSprintsPerPage] = useState(7);
    const indexOfLastSprint = currentPage * SprintsPerPage;
    const indexOfFirstSprint = indexOfLastSprint - SprintsPerPage;
    const currentSprint = sprints.slice(indexOfFirstSprint, indexOfLastSprint);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div class="d-flex fontSize mt-5" id="wrapper">
            <div id="page-content-wrapper">
                <div class="card ml-3 mt-2 mb-3 mr-3">
                    <div class="card-header text-uppercase">
                        <h6 class="d-inline">Project A</h6>
                        <a href="" class="float-right text-dark"><i class="fa fa-search"></i></a>
                    </div>

                    <div class="list-group mb-0">
                        <table class="table table-striped table-success">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Sprint Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSprint.map(sprint => (
                                    <tr>
                                        <th scope="row">{sprints.indexOf(sprint)}</th>
                                        <td>{sprint}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row ml-3 mt-2 mb-3 mr-3">
                    <SetPagination
                        IssuePerPage={SprintsPerPage}
                        totalIssues={sprints.length}
                        paginate={paginate}
                    />
                </div>
            </div>

        </div>
    )
}

export default SprintBacklog;