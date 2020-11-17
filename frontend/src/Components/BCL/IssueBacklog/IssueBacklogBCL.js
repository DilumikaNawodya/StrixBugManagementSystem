import React,{useState} from 'react';
import SetPagination from '../../Common/Pagination/Pagination';
import './IssueBacklogBCL.scss'


function IssueBacklogBCL() {

  const bugs = ["bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1","bug1"]

  const [currentPage, setCurrentPage] = useState(1);
  const [IssuePerPage, setIssuePerPage] = useState(7);
  const indexOfLastIssue = currentPage * IssuePerPage;
  const indexOfFirstIssue = indexOfLastIssue - IssuePerPage;
  const currentIssue = bugs.slice(indexOfFirstIssue, indexOfLastIssue);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div class="d-flex fontSize" id="wrapper">
      <div id="page-content-wrapper">

        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Dashboard</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button class="btn btn-sm btn-outline-secondary">Add Issue</button>
            </div>
            <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
              <span data-feather="calendar"></span>
              Sort by
            </button>
          </div>
        </div>

        <div class="card ml-3 mt-2 mb-3 mr-3">

          <div class="card-header text-uppercase">
            <h6 class="d-inline">Project A</h6>
            <a href="" class="float-right text-dark"><i class="fa fa-search"></i></a>
          </div>

          <div class="list-group mb-0">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">BugName</th>
                </tr>
              </thead>
              <tbody>
                {currentIssue.map(bug=>(
                  <tr>
                    <th scope="row">{bugs.indexOf(bug)}</th>
                    <td>{bug}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

        </div>

      <div class="row ml-3 mt-2 mb-3 mr-3">
        <SetPagination
          IssuePerPage={IssuePerPage}
          totalIssues={bugs.length}
          paginate={paginate}
        />
      </div>

      </div>

      

    </div>
  )
}


export default IssueBacklogBCL;