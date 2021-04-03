import React from "react";
import { Form, Button } from "react-bootstrap";
import { BehaviorSubject } from "rxjs";
import { sprintService } from "../../../Services/SprintService";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

function AddSprintModal(props) {
  return (
    <div>
      <div class="modal-header">
        <h6 class="modal-title text-light">Add Sprint</h6>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          onClick={props.cl}
        >
          &times;
        </button>
      </div>
      <div class="mt-3 mb-3">
        <Form>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Name"
          ></Form.Control>
        </Form>
      </div>

      <Button
        type="submit"
        style={{ marginRight: "20px" }}
        onClick={sprintService.CreateSprint(currentUserSubject.Token)}
      >
        Add
      </Button>
      <Button type="button" onClick={props.cl}>
        Cancel
      </Button>
    </div>
  );
}
export default AddSprintModal;
