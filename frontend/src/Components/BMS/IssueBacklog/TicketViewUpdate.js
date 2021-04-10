import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CommentSection from "../../Common/Comment/CommentSection";
import { Formik, Field, Form } from "formik";
import { ticketService } from "../../../Services/TicketService";
import Swal from "sweetalert2";

function TicketView(props) {
  const [totalEffort, setTotalEffort] = useState("");
  const [dailyEffort, setdailyEffort] = useState("");
  const [mediaModal, setMediaModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const { ticketMedia } = ticketService.GetTicketMedia(props.data.id);

  const initialValues = {
    severity: props.data.Severity.id.toString(10),
    priority: props.data.Priority.id.toString(10),
    bugtype: props.data.BugType.id.toString(10),
    review: props.data.review == true ? "true" : "false",
  };

  function onSubmitTotalEffort(id) {
    ticketService
      .UpdateByManager(totalEffort, id)
      .then(function (response) {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: response.data.data,
          showConfirmButton: true,
          timer: 5000,
        }).then(function () {
          window.location.reload(true);
        });
      })
      .catch(function (error) {
        Swal.fire({
          position: "middle",
          icon: "warning",
          title: error.response.data.data,
          showConfirmButton: true,
          timer: 5000,
        }).then(function () {
          window.location.reload(true);
        });
      });
  }

  function onSubmitDailyEffort(id) {
    ticketService
      .UpdateByDev(dailyEffort, id)
      .then(function (response) {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: response.data.data,
          showConfirmButton: true,
          timer: 5000,
        }).then(function () {
          window.location.reload(true);
        });
      })
      .catch(function (error) {
        Swal.fire({
          position: "middle",
          icon: "warning",
          title: error.response.data.data,
          showConfirmButton: true,
          timer: 5000,
        }).then(function () {
          window.location.reload(true);
        });
      });
  }

  function onSubmit(fields) {
    ticketService
      .UpdateByQA(fields, props.data.id)
      .then(function (response) {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: response.data.data,
          showConfirmButton: true,
          timer: 5000,
        }).then(function () {
          window.location.reload(true);
        });
      })
      .catch(function (error) {
        Swal.fire({
          position: "middle",
          icon: "warning",
          title: error.response.data.data,
          showConfirmButton: true,
          timer: 5000,
        }).then(function () {
          window.location.reload(true);
        });
      });
  }

  return (
    <>
      <div>
        <div class="modal-header">
          <h4 class="modal-title text-light">
            <h6>Issue ID: {props.data.id}</h6>
            {props.data.issuename}
          </h4>
          <button
            type="button btn-primary"
            class="close"
            data-dismiss="modal"
            onClick={props.cl}
          >
            &times;
          </button>
        </div>

        <div class="modal-body">
          <div class="row container">
            <span class={"mt-1 badge badge-" + props.data.Severity.color}>
              {props.data.Severity.severity}
            </span>
            <span class={"ml-2 mt-1 badge badge-" + props.data.Priority.color}>
              {props.data.Priority.priority}
            </span>
            <span
              class={
                props.data.review == true
                  ? "ml-2 mt-1 badge badge-success"
                  : "ml-2 mt-1 badge badge-danger"
              }
            >
              {props.data.review == true ? "Reviewed" : "Not Reviewed"}
            </span>
            <span class="ml-2 mt-1 badge badge-secondary">
              {props.data.BugType.bugtype}
            </span>
            <span class="ml-2 mt-1 badge badge-info">
              {props.data.Workstate.workstatename}
            </span>
            {props.role == "QA" && (
              <i
                class="fa fa-pencil mr-1 ml-1 mt-1 float-right"
                onClick={() => {
                  setEditModal(true);
                }}
              ></i>
            )}
          </div>
          {props.role == "Manager" && (
            <div class="row container">
              <div class="form-inline">
                <input
                  type="number"
                  placeholder="Add Total Effort Here"
                  class="form-control"
                  name="totaleffort"
                  value={props.data.totaleffort}
                  onChange={(event) => {
                    setTotalEffort(event.currentTarget.value);
                  }}
                />
              </div>
            </div>
          )}
          {props.role == "Developer" && (
            <div class="row container">
              <div class="form-inline">
                <input
                  type="number"
                  placeholder="Add Daily Effort Here"
                  class="form-control"
                  name="dailyeffort"
                  onChange={(event) => {
                    setdailyEffort(event.currentTarget.value);
                  }}
                />
              </div>
            </div>
          )}
          <div class="row container">
            <div class="col  p-0 text-left">
              <b class="mr-2">Created:</b>
              {props.data.date}
            </div>
          </div>
          <div class="row container">
            <div class="col  p-0 text-left">
              <b class="mr-2">Updated:</b>2021-03-16
            </div>
          </div>

          <div class="row container">
            <b class="mr-2">Description:</b> {props.data.issuedescription}
          </div>

          <div class="row container">
            <button class="btn btn-sm" onClick={() => setMediaModal(true)}>
              <span class="fa fa-picture-o fa-lg mr-2"></span>
              View Media Files
            </button>
          </div>

          {props.role == "Manager" && totalEffort != "" && (
            <div class="row container">
              <button
                class="btn btn-dark"
                style={{ float: "right" }}
                type="button"
                onClick={() => onSubmitTotalEffort(props.data.id)}
              >
                Update Ticket
              </button>
            </div>
          )}
          {props.role == "Developer" && dailyEffort != "" && (
            <div class="row container">
              <button
                class="btn btn-dark"
                style={{ float: "right" }}
                type="button"
                onClick={() => onSubmitDailyEffort(props.data.id)}
              >
                Update Ticket
              </button>
            </div>
          )}
          <hr style={{ borderTop: "3px solid" }} />
          <div class="row container">
            <b class="mr-2">Comments:</b>
          </div>
          <CommentSection tid={props.data.id} />
        </div>
      </div>

      <Modal size="sm" show={editModal}>
        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => {
              return (
                <Form>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Severity</label>
                      <Field
                        name="severity"
                        as="select"
                        className="form-control"
                      >
                        <option value={1}>Critical</option>
                        <option value={2}>High</option>
                        <option value={3}>Medium</option>
                        <option value={4}>Low</option> 
                        
                      </Field>
                    </div>

                    <div className="form-group col-6">
                      <label>Priority</label>
                      <Field
                        name="priority"
                        as="select"
                        className="form-control"
                      >
                        <option value={1}>Urgent</option>
                        <option value={2}>High</option>
                        <option value={3}>Medium</option>
                        <option value={4}>Low</option>
                      </Field>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Bug Type</label>
                      <Field
                        name="bugtype"
                        as="select"
                        className="form-control"
                      >
                        <option value={1}>Functional</option>
                        <option value={2}>Performance</option>
                        <option value={3}>Usability</option>
                        <option value={4}>Compatibility</option>
                        <option value={5}>Security</option>
                      </Field>
                    </div>

                    <div className="form-group col-6">
                      <label>Review</label>
                      <Field name="review" as="select" className="form-control">
                        <option value={true}>Reviewed</option>
                        <option value={false}>Not Reviewed</option>
                      </Field>
                    </div>
                  </div>

                  <button class="btn btn-dark pull-right" type="submit">
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Update
                  </button>

                  <a
                    class="btn btn-light mr-2 pull-right"
                    onClick={() => {
                      setEditModal(false);
                    }}
                  >
                    Cancel
                  </a>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal size="lg" show={mediaModal}>
        <Modal.Body>
          {ticketMedia.map((item, index) => {
            return (
              <div class="d-flex flex-row comment-row">
                <video src={item.files} width="100%" height="auto" />
              </div>
            );
          })}

          <a
            class="btn btn-light mr-2 pull-right"
            onClick={() => {
              setMediaModal(false);
            }}
          >
            Cancel
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TicketView;
