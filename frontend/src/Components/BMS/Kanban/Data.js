import { useState, useEffect } from "react";
import { sprintService } from "../../../Services/SprintService";


function SetKanbanData(sid) {

  const [initialData, setInitialData] = useState({
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Open",
        taskIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "In-Progress",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Review",
        taskIds: [],
      },
      "column-4": {
        id: "column-4",
        title: "Completed",
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  })


  useEffect(() => {
    sprintService.GetKanbanTasks(sid, 1)
      .then(function (response_one) {
          sprintService.GetKanbanTasks(sid, 2)
            .then(function (response_two) {
              setInitialData({
                ...initialData,
                tasks: response_one.data[0],
                columns: response_two.data[0]
              })
            })
      })
  }, [])

  return initialData

}

export default SetKanbanData