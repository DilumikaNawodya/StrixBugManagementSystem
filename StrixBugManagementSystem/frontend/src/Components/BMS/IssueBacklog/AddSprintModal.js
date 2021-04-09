import React from "react";
import { Form, Button } from "react-bootstrap";
import { sprintService } from "../../../Services/SprintService";
import Swal from 'sweetalert2'
import { projectService } from "../../../Services/ProjectService";


function AddSprintModal(props) {

  function onSubmit(e){
    e.preventDefault()
    sprintService.CreateSprint(e.target.name.value, e.target.enddate.value, projectService.getCurrentProject())
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
    <div>
      <div class="contact-form">
        <h3 style={{marginTop: "-1.75em"}}>Add Sprint</h3>
        <Form onSubmit={onSubmit}>
          <Form.Control type="text" name="name" placeholder="Enter Sprint Name"></Form.Control>
          <Form.Control type="number" className="mt-2" name="enddate" placeholder="Enter Sprint Dates (In days)"></Form.Control>
          <Button type="submit" className="pull-right btnContact mt-4">
            Add
          </Button>
          <Button type="button" className="pull-right btnContact mt-2" onClick={props.cl}>
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default AddSprintModal;
