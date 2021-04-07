import React, { useState, useEffect,  } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import WarningModal from "./WarningModal";
import { Modal } from "react-bootstrap";
import SetKanbanData from "./Data";
import { sprintService } from "../../../Services/SprintService";
import { useParams } from "react-router";

const Container = styled.div`
  display: flex;
`;

const Kanban = () => {

  const {sid} = useParams()

  const initialData = SetKanbanData(sid)
  const [state, setState] = useState(initialData)
  const [dropDetails, setDropDetails] = useState({
    destid: '',
    tid: ''
  })

  useEffect(() =>{
    setState(initialData)
  },[initialData])
  
  function SetDrop(){
    sprintService.UpdateWorkstate(dropDetails)
  }

  const [isModalOpen, setisModalOpen] = useState(false);
  
  function onDragEnd(result){
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if(destination.droppableId === "column-4"){
      setDropDetails({
        destid: destination.droppableId,
        tid: draggableId
      })
    }else{
      sprintService.UpdateWorkstate({
        destid: destination.droppableId,
        tid: draggableId
      })
    }
    

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (
      destination.droppableId === "column-4" &&
      source.droppableId != "column-4"
    ) {
      setisModalOpen(true);
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      //Moving in the same column
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    //Moving between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <div>
      {" "}
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {state.columnOrder.map((columnID) => {
            let column = state.columns[columnID]
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId])
            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>
      </DragDropContext>
      <Modal size="md" show={isModalOpen}>
        <Modal.Body>
          <WarningModal cl={() => setisModalOpen(false)} submit={() => SetDrop()} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Kanban;
