import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Modal, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsClock, BsExclamationTriangle } from "react-icons/bs";
import TicketView from "../IssueBacklog/TicketViewUpdate";
import { ticketService } from "../../../Services/TicketService";
import { projectService } from "../../../Services/ProjectService";
import { authenticationService } from "../../../Services/LoginService";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 8px;
  min-height: 50px;
  margin-bottom: 8px;
  font-size: 14px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgrey"
      : "white"};
`;

const Bug = (props) => {
  var userRole = "Block";
  if (authenticationService.currentUserValue != null) {
    userRole = authenticationService.userRole;
  }

  const [isManagerModelOpen, setisManagerModelOpen] = useState(false);
  const [isQAModelOpen, setisQAModelOpen] = useState(false);
  const [isDevModelOpen, setisDevModelOpen] = useState(false);

  const [issue, setIssue] = useState();

  async function OpenTicket() {
    let issueData = await ticketService.FetchOneBug(
      projectService.getCurrentProject(),
      props.task.id
    );
    setIssue(issueData);
    if (userRole == "Manager") {
      setisManagerModelOpen(true);
    } else if (userRole == "QA") {
      setisQAModelOpen(true);
    } else if (userRole == "Developer") {
      setisDevModelOpen(true);
    }
  }

  return (
    <div style={{}}>
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={() => OpenTicket()}
          >
            {props.task.content}
            <br />
            <OverlayTrigger overlay={<Tooltip>Priority</Tooltip>}>
              <Badge
                pill
                variant={
                  props.task.priority === "Low"
                    ? "primary"
                    : props.task.priority === "Medium"
                    ? "success"
                    : props.task.priority === "High"
                    ? "warning"
                    : "danger"
                }
              >
                <BsClock />
              </Badge>
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger overlay={<Tooltip>Severity</Tooltip>}>
              <Badge
                pill
                variant={
                  props.task.priority === "Low"
                    ? "primary"
                    : props.task.priority === "Medium"
                    ? "success"
                    : props.task.priority === "High"
                    ? "warning"
                    : "danger"
                }
              >
                <BsExclamationTriangle />
              </Badge>
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger overlay={<Tooltip>Bug Type</Tooltip>}>
              <Badge variant="dark">{props.task.bugType}</Badge>
            </OverlayTrigger>
          </Container>
        )}
      </Draggable>

      <Modal size="lg" show={isManagerModelOpen}>
        <Modal.Body>
          <TicketView
            cl={() => setisManagerModelOpen(false)}
            data={issue}
            role="Manager"
          />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={isQAModelOpen}>
        <Modal.Body>
          <TicketView
            cl={() => setisQAModelOpen(false)}
            data={issue}
            role="QA"
          />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={isDevModelOpen}>
        <Modal.Body>
          <TicketView
            cl={() => setisDevModelOpen(false)}
            data={issue}
            role="Developer"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Bug;
