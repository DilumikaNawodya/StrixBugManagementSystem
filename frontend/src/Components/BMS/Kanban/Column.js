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
  background-color: #e0e0e0;
`;

const Title = styled.h6`
  padding-top: 12px;
  padding-left: 10px;
  color: dark;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  text-align: left;
  font-weight: bold;
`;

const BugList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "darkgrey" : "#e0e0e0")};
  flex-grow: 1;
  min-height: 500px;
`;

export const Hruler = styled.hr`
  margin-top: 0px;
  margin-left: 10px;
  margin-right: 10px;
  border-top: 1px solid black;
`;


const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Hruler/>
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
