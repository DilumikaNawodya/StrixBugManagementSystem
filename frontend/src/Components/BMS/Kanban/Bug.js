import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsClock, BsExclamationTriangle } from "react-icons/bs";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgrey"
      : "white"};
`;

const Bug = (props) => {
  return (
    <div style={{}}>
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
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
    </div>
  );
};

export default Bug;
