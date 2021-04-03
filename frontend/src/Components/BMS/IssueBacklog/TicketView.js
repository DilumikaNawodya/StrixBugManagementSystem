import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import { Badge, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsClock, BsExclamationTriangle, BsCheckBox } from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import API from "../../../Services/Base";

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
  const workState = (props) => {
    if (props.data.workstate == 1) {
      return "Open";
    }
    if (props.data.workstate == 2) {
      return "In Progress";
    }
    if (props.data.workstate == 3) {
      return "Review";
    } else {
      return "Done";
    }
  };

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
            <Badge
              pill
              variant={BadgeColor(props.data.severity)}
            >
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
            <Badge
              pill
              variant="secondary"
            >
              {props.data.bugtype}
            </Badge>
          </OverlayTrigger>
          &nbsp;
          <OverlayTrigger overlay={<Tooltip>Status</Tooltip>}>
            <Badge pill variant="info">
              {workState(props)}
            </Badge>
          </OverlayTrigger>
          <span class="ml-auto">Assignee: Chandeepa Pathirana</span>
        </div>

        <div class="col p-0 text-center">

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
