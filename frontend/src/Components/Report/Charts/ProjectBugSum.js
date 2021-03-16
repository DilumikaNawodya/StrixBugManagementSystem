import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { reportService } from "../../../Services/ReportService";

function ProjectBugSum() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData({
      labels: ["Project A", "Project B", "Project C", "Project D", "Project E"],
      datasets: [
        {
          label: "Open",
          data: [408, 547, 675, 734, 500],
          backgroundColor: "rgba(255,99,132,1)",
          hoverBackgroundColor: "rgba(255,99,132,0.9)",
          hoverBorderWidth: 2,
          hoverBorderColor: "lightgrey",
        },
        {
          label: "In-Progress",
          data: [408, 547, 675, 734, 600],
          backgroundColor: "rgba(255,206,90,1)",
          hoverBackgroundColor: "rgba(255,206,90,0.9)",
          hoverBorderWidth: 2,
          hoverBorderColor: "lightgrey",
        },
        {
          label: "Review",
          data: [408, 547, 675, 734, 200],
          backgroundColor: "rgba(54,162,235,1)",
          hoverBackgroundColor: "rgba(54,162,235,0.9)",
          hoverBorderWidth: 2,
          hoverBorderColor: "lightgrey",
        },
        {
          label: "Completed",
          data: [133, 221, 783, 1478, 675],
          backgroundColor: "rgba(25,159,64,1)",
          hoverBackgroundColor: "rgba(25,159,64,0.9)",
          hoverBorderWidth: 2,
          hoverBorderColor: "lightgrey",
        },
      ],
    });
  }, []);

  const options = {
    title: {
      display: true,
      text: "Project Bug Summary",
      fontSize: 14,
      fontFamily: "Arial",
    },
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };
  return (
    <div class="canvas-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default ProjectBugSum;
