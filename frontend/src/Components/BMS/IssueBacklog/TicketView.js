import React from "react";
import { Button } from "react-bootstrap";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsClock, BsExclamationTriangle, BsCheckBox } from "react-icons/bs";

function TicketView(props) {
  return (
    <div>
      {/*Modal Header*/}
      <div class="modal-header">
        <h4 class="modal-title text-light">
          <h6>Issue ID: 001</h6>Incorrect Calculations
        </h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          onClick={props.cl}
        >
          &times;
        </button>
      </div>
      {/*Modal Body*/}
      <div class="modal-body">
        <div class="row">
          <OverlayTrigger overlay={<Tooltip>Priotiy</Tooltip>}>
            <Badge pill variant="success">
              <BsClock />
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger overlay={<Tooltip>Severity</Tooltip>}>
            <Badge pill variant="warning">
              <BsExclamationTriangle />
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger overlay={<Tooltip>Initial Review</Tooltip>}>
            <Badge pill variant="danger">
              <BsCheckBox />
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger overlay={<Tooltip>Bug Type</Tooltip>}>
            <Badge pill variant="secondary">
              BugType
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger overlay={<Tooltip>Status</Tooltip>}>
            <Badge pill variant="info">
              Workstate
            </Badge>
          </OverlayTrigger>
          <span class="ml-auto">Assignee: Chandeepa Pathirana</span>
        </div>
        <div class="row mt-3">
          <div class="col  p-0 text-left">Created: 16/03/2021</div>
          <div class="col  p-0 text-right ">Updated: 16/03/2021</div>
        </div>
        <div class="row mt-2">
          <h6 class="font-weight-bold pr-2">Description:</h6>
          React is an open-source, front end, JavaScript library for building
          user interfaces or UI components. It is maintained by Facebook and a
          community of individual developers and companies. React can be used as
          a base in the development of single-page or mobile applications
        </div>
        <div class="row mt-3">Comments</div>
      </div>
    </div>
  );
}
export default TicketView;
