import React from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsClock, BsExclamationTriangle, BsCheckBox } from "react-icons/bs";

const BadgeColor = (type) => {
  switch (type) {
    case "high":
      return "warning";
      break;

    case "medium":
      return "success";
      break;

    case "low":
      return "primary";
      break;

    default:
      return "danger";
  }
};

function TicketView(props) {
  return (
    <div>
      {/*Modal Header*/}
      <div class="modal-header">
        <h4 class="modal-title text-light">
          <h6>Issue ID: {props.data.id}</h6>
          {props.data.issuename}
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
          <OverlayTrigger
            overlay={<Tooltip>{props.data.priority} priority</Tooltip>}
          >
            <Badge pill variant={BadgeColor(props.data.priority)}>
              <BsClock />
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger
            overlay={<Tooltip>{props.data.severity} severity</Tooltip>}
          >
            <Badge pill variant={BadgeColor(props.data.severity)}>
              <BsExclamationTriangle />
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger overlay={<Tooltip>Initial Review</Tooltip>}>
            <Badge
              pill
              variant={props.data.review === "Reviewed" ? "success" : "danger"}
            >
              <BsCheckBox />
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger overlay={<Tooltip>Bug Type</Tooltip>}>
            <Badge pill variant="secondary">
              {props.data.bugtype}
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger overlay={<Tooltip>Status</Tooltip>}>
            <Badge pill variant="info">
              {props.data.workstate}
            </Badge>
          </OverlayTrigger>
          <span class="ml-auto">Assignee: Chandeepa Pathirana</span>
        </div>
        <div class="row mt-3">
          <div class="col  p-0 text-left">Created: {props.data.date}</div>
          <div class="col  p-0 text-right ">Updated: 2021-03-16</div>
        </div>
        <div class="row mt-2">
          <h6 class="font-weight-bold pr-2">Description:</h6>
          {props.data.issuedescription}
        </div>
        <div class="row mt-3">Comments</div>
      </div>
    </div>
  );
}
export default TicketView;
