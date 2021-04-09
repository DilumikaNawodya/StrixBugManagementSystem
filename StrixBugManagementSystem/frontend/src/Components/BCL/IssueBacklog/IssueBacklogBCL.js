import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import SetPagination from '../../Common/Pagination/Pagination';
import useFetchBugs from '../../../Services/TicketService';
import './IssueBacklogBCL.scss'
import { projectService } from '../../../Services/ProjectService';
import IssueForm from '../IssueCreateForm/IssueForm';
import { Modal } from 'react-bootstrap';

function IssueBacklogBCL() {

  const {pid} = useParams()
  localStorage.setItem('projectID', JSON.stringify(pid))

  const projectName = projectService.GetProject(pid).projectname

  const { bugs } = useFetchBugs('',pid)

  const [isModelOpen, setisModelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [IssuePerPage, setIssuePerPage] = useState(7);
  const indexOfLastIssue = currentPage * IssuePerPage;
  const indexOfFirstIssue = indexOfLastIssue - IssuePerPage;
  const currentIssue = bugs.slice(indexOfFirstIssue, indexOfLastIssue);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

  return (
      <>

        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Backlog</h1>

          <div class="btn-toolbar mb-2 mb-md-0">

            <div class="btn-group mr-2">
              <button class="btn btn-sm btn-dark" onClick={() => setisModelOpen(true)}>Add Issue</button>
            </div>

            <button class="btn btn-sm btn-dark dropdown-toggle" type="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span data-feather="calendar"></span>
                Sort by
            </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">By Date</a>
                <a class="dropdown-item" href="#">By Name</a>
                {/* <a class="dropdown-item" href="#"></a> */}
              </div>

          </div>
        </div>

        <div class="card ml-3 mt-2 mb-3 mr-3">

          <div class="card-header text-uppercase">
              <h6 class="d-inline">{projectName}</h6>
            <a href="" class="float-right text-dark"><i class="fa fa-search"></i></a>
          </div>

          <div class="list-group mb-0">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Severity</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Date</th>
                  <th scope="col">Issue Name</th>
                  <th scope="col">Bug type</th>
                </tr>
              </thead>
              <tbody>
                {currentIssue.map(bug=>(
                  <tr>
                    <td>{bug.severity}</td>
                    <td>{bug.priority}</td>
                    <td>{bug.date}</td>
                    <td>{bug.issuename}</td>
                    <td>{bug.bugtype}</td>
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

      <Modal size="lg" show={isModelOpen}>
        <Modal.Body>
          <IssueForm cl={() => setisModelOpen(false)}/>
        </Modal.Body>
      </Modal>

      </>
  )
}


export default IssueBacklogBCL;