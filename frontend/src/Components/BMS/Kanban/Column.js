import React from "react";
import styled from "styled-components";
import Bug from "./Bug";
import { Droppable } from "react-beautiful-dnd";
import { authenticationService } from "../../../Services/LoginService";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  width: 25%;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: #01161e;
  color: lightgrey;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  text-align: center;
`;

const BugList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "darkgrey" : "white")};
  flex-grow: 1;
  min-height: 500px;
`;

const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable
        droppableId={props.column.id}
        type={
          props.column.id === "column-4" &&
          authenticationService.userRole === "Developer"
            ? "done"
            : "active"
        }
      >
        {(provided, snapshot) => (
          <BugList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task, index) => (
              <Bug key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </BugList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
