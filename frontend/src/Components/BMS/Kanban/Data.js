const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Grammar Error",
      bugType: "Usability",
      priority: "Low",
      severity: "Low",
    },
    "task-2": {
      id: "task-2",
      content: "Display Error",
      bugType: "Usability",
      priority: "High",
      severity: "High",
    },
    "task-3": {
      id: "task-3",
      content: "System Crash",
      bugType: "Functional",
      priority: "Urgent",
      severity: "Critical",
    },
    "task-4": {
      id: "task-4",
      content: "New functionality",
      bugType: "Functional",
      priority: "Medium",
      severity: "Medium",
    },
    "task-5": {
      id: "task-5",
      content: "Remove Gradient",
      bugType: "Usability",
      priority: "Low",
      severity: "Low",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Open",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In-Progress",
      taskIds: ["task-3"],
    },
    "column-3": {
      id: "column-3",
      title: "Review",
      taskIds: ["task-4"],
    },
    "column-4": {
      id: "column-4",
      title: "Completed",
      taskIds: ["task-5"],
    },
  },

  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default initialData;
