import React, { useState, useEffect } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import WarningModal from "./WarningModal";
import { Modal } from "react-bootstrap";
import SetKanbanData from "./Data";
import { sprintService } from "../../../Services/SprintService";
import { authenticationService } from "../../../Services/LoginService";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { Hruler } from "../Kanban/Column"
import Preloader from "../../Common/Preloader/Preloader";
import Error from "../../Common/Errors/Error";

const Container = styled.div`
  display: flex;
`;

const Kanban = () => {
  const { sid } = useParams();

  var userRole = "Block";
  if (authenticationService.currentUserValue != null) {
    userRole = authenticationService.userRole;
  }

  const initialData = SetKanbanData(sid);
  const [state, setState] = useState(initialData);
  const { sprintdata, loading, error, message } = sprintService.GetSprintData(sid)
  const [dropDetails, setDropDetails] = useState({
    destid: "",
    tid: "",
  });

  useEffect(() => {
    setState(initialData);
  }, [initialData]);

  function SetDrop() {
    sprintService.UpdateWorkstate(dropDetails).then(function () {
      window.location.reload(true);
    });
  }

  const [isModalOpen, setisModalOpen] = useState(false);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === "column-4") {
      setDropDetails({
        destid: destination.droppableId,
        tid: draggableId,
      });
    } else {
      sprintService.UpdateWorkstate({
        destid: destination.droppableId,
        tid: draggableId,
      });
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
  }

  return (
    <div>
      {" "}
      {!error && <div class="p-0">
        <div class="card-body">
          <p class="card-text">
            {sprintdata.map((e) => {
              return (
                <div className="row">
                  <div className="col">
                    <h2 class="mt-2">{e.name}</h2>
                    <p className="mt-2">End Date: {e.enddate}</p>
                  </div>
                  {userRole === "Manager" && (
                    <div className="col">
                      <button
                        class="btn btn-sm btn-dark float-right mt-2"
                        onClick={() =>
                          Swal.fire({
                            title: 'Are you sure?',
                            text: "You are about End Sprint",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              sprintService.EndSprint(sid)
                                .then(function (response) {
                                  Swal.fire({
                                    position: "middle",
                                    icon: "success",
                                    title: "Successfully ended",
                                    showConfirmButton: true,
                                    timer: 5000,
                                  }).then(function () {
                                    window.location.reload(true);
                                  });
                                })
                                .catch(function (error) {
                                  Swal.fire({
                                    position: "middle",
                                    icon: "warning",
                                    title: "Cannot end sprint",
                                    showConfirmButton: true,
                                    timer: 5000,
                                  }).then(function () {
                                    window.location.reload(true);
                                  });
                                })
                            }
                          })
                        }
                      >
                        End Sprint
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </p>
        </div>
      </div>}
      {!error && <Hruler />}
      {!error && <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {state.columnOrder.map((columnID) => {
            let column = state.columns[columnID];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>}
      <Modal size="md" show={isModalOpen}>
        <Modal.Body>
          <WarningModal
            cl={() => window.location.reload(true)}
            submit={() => SetDrop()}
          />
        </Modal.Body>
      </Modal>

      { loading && <div>

        <Preloader />

      </div>}

      { error && <div>

        {
          <Error message={message} />
        }

      </div>}
    </div>
  );
};

export default Kanban;
