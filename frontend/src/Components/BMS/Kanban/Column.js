import React from "react";
import styled from "styled-components";
import Bug from "./Bug";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 20%;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
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
        type={props.column.id === "column-4" ? "done" : "active"}
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
