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

function QATicketView(props) {
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

  const [inHover, setHover] = useState(false);
  const [stateB, setStateB] = useState(false);
  const [stateS, setStateS] = useState(false);

  function handleBugType(e) {
    const bugtype = e.target.value; // Update the bug type tag
    console.log(bugtype);
    const request = API.patch(
      "/qaupdatebugtype/" + props.data.id + "/",
      {
        bugtype: bugtype,
      },
      {}
    );
    window.location.reload(true);
    return request;
  }

  const toggleDropdownBugType = () => {
    setStateB(!stateB);
  };

  function renderDropDownBugTypeMenu() {                 // drop down menu of bug type
    return (
      <div style={{ marginLeft: "300px" }}>
        <select
          className="form-control"
          name="bugType"
          onChange={handleBugType}
          style={{ width: `165px`, height: "40px" }}
        >
          <option selected>Select a new tag</option>
          <option value="Functional">Functional</option>
          <option value="Performance">Performance</option>
          <option value="Usability">Usability</option>
          <option value="Compatibility">Compatibility</option>
          <option value="Security">Security</option>
        </select>
      </div>
    );
  }

  function handleSeverity(e) {          // update the severity tag
    const severity = e.target.value;
    console.log(severity);
    const request = API.patch(
      "/qaupdateseverity/" + props.data.id + "/",
      {
        severity: severity,
      },
      {}
    );
    window.location.reload(true);
    return request;
  }


  const toggleDropdownSeverity = () => {
    setStateS(!stateS);
  };

  function renderDropDownSeverityMenu() {              // drop down menu of severity
    return (
      <div style={{ marginLeft: "300px" }}>
        <select
          className="form-control"
          name="bugType"
          onChange={handleSeverity}
          style={{ width: `165px`, height: "40px" }}
        >
          <option selected>Select a new tag</option>
          <option value="critical">critical</option>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
      </div>
    );
  }

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
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <BsExclamationTriangle />
              {inHover && (
                <IconButton
                  color="primary"
                  size="small"
                  onClick={toggleDropdownSeverity}
                >
                  <IoIcons.IoMdCreate />
                </IconButton>
              )}
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
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {props.data.bugtype}
              {inHover && (
                <IconButton
                  color="secondary"
                  size="small"
                  aria-label="upload picture"
                  onClick={toggleDropdownBugType}
                >
                  <IoIcons.IoMdCreate />
                </IconButton>
              )}
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
          {stateB && renderDropDownBugTypeMenu()}
          {stateS && renderDropDownSeverityMenu()}

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
export default QATicketView;
