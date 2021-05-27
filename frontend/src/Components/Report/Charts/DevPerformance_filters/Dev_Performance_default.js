import React, { useState, useEffect } from 'react';
import { Card,  Row,  } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import 'react-datepicker/dist/react-datepicker.css'
import API from '../../../../Services/Base';


function Dev_Performance_default() {
  const [devPerf, setDevPerf] = useState([]);

  //-------------Developer Effort---------------
  //------------------Stacked bar chart for Developer * Bug development----------------
  const [test, setTest] = useState([]);
  const [avgEffort, setAvgEffort] = useState([]);
  const [project, setProject] = useState([])

  let yr = []
  let currentyear = new Date().getFullYear();

  for (let x = currentyear; x > currentyear - 10; x--) {
    yr.push({ "year": x })
  }

  const getData_1 = async () => {
    const article = {
      "status": 1,
      "projectid": "None",
      "to": null,
      "from": null,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    };
    API.post('/DeveloperPerformance/', article, { headers })
      .then(response => setTest(response))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getData_1();
  }, []);

  async function getData_2(){
    const response = await API.get("/Projects/");
    const res = await response.data;
    setProject(res)
  }

  useEffect(() => {
    getData_2();
  }, []);



  if (test.data != null) {
    let month_date = test.data.data.map(e => e.date__month)
    let dailyeffort_avg = test.data.data.map(e => e.dailyeffort__avg)
    let resolved = test.data.data.map(e => e.resolved)
    let in_progress = test.data.data.map(e => e.in_progress)
    let total_assigned = test.data.data.map(e => e.total_assigned)

    let count_Total_assigned = 0;
    let count_resolved = 0;
    let count_in_progress = 0;

    for (let i = 0; i < month_date.length; i++) {
      count_Total_assigned = count_Total_assigned + total_assigned[i];
      count_resolved = count_resolved + resolved[i];
      count_in_progress = count_in_progress + in_progress[i];

      switch (month_date[i]) {
        case 1:
          month_date[i] = "Jan"
          break;
        case 2:
          month_date[i] = "Feb"
          break;
        case 3:
          month_date[i] = "March"
          break;
        case 4:
          month_date[i] = "April"
          break;
        case 5:
          month_date[i] = "May"
          break;
        case 6:
          month_date[i] = "June"
          break;
        case 7:
          month_date[i] = "July"
          break;
        case 8:
          month_date[i] = "Aug"
          break;
        case 9:
          month_date[i] = "Sep"
          break;
        case 10:
          month_date[i] = "Oct"
          break;
        case 11:
          month_date[i] = "Nov"
          break;
        case 12:
          month_date[i] = "Dec"
          break;
        default:
          month_date[i] = " "

      }
    }


    setTest({

      labels: month_date,
      datasets: [
        {
          label: "Total In-Progress",
          data: in_progress,
          backgroundColor: "rgba(255,206,90,0.5)",
          bordergroundColor: "rgba(255,206,90,1)",
          hoverBorderWidth: 2,

          stack: 1
        },
        {
          label: "Resolved",
          data: resolved,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          hoverBorderWidth: 2,
          stack: 1
        },

      ],
    });

    setAvgEffort({
      labels: month_date,
      // ["Jan", "Feb", "March", "Apr", "May", "June", "July","Aug","Sep", "Oct", "Nov","Dec"]
      datasets: [
        {
          label: "Average Effort",
          data: dailyeffort_avg,
          backgroundColor: "rgb(92, 184, 92, 0.6)",
          borderColor: "rgb(92, 184, 92,0.8)",
          hoverBorderWidth: 2,
          //hoverBorderColor: "lightgrey",

        }

      ],
    });

    setDevPerf(
      {
        labels: ["Total Assigned", "Total Completed", "Total In progress"],
        datasets: [
          {
            label: 'Developer Summary ',
            data: [count_Total_assigned, count_resolved, count_in_progress],
            backgroundColor: [

              'rgba(54, 162, 235, 0.6)',
              'rgba(255,99,132,0.6)',
              'rgba(255,206,90,0.6)',
            ],
            hoverBackgroundColor: [

              'rgba(54, 162, 235, 0.9)',
              'rgba(255,99,132,0.9)',
              'rgba(255,206,90,0.9)',
            ],
            pointBorderColor: 'rgba(255,206,86,0.2)'
          }

        ]

      }

    )


  }

  const options3 = {
    title: {
      display: true,
      text: "Developer x Average Effort",
      fontSize: 18,
      fontFamily: "Arial",
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }

  };


  const options = {
    title: {
      display: true,
      fontSize: 18,
      text: "Developer Performance"
    },

  }
  const options2 = {
    title: {
      display: true,
      text: "Developer x Bug Development",
      fontSize: 20,
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
    <div>
      <Row style={{ marginBottom: 10 }}>
        <div className="col-md-6 col-sm-12 col-xs-12">
          <Card style={{ backgroundColor: "rgb(244, 244, 244)" }}>
            <div style={{ margin: 10 }} >
              <Pie data={devPerf} options={options} />
            </div>
          </Card>
          <hr />
        </div>
        <div className="col-md-6 col-sm-12 col-xs-12">
          <Card style={{ backgroundColor: "rgb(244, 244, 244)" }}>
            <div style={{ margin: 10 }} >
              <Bar data={avgEffort} options={options3} />
            </div>
          </Card>
          <hr />
        </div>
      </Row>

      <Row style={{ marginBottom: 20, marginTop: 10 }}>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <Card style={{ backgroundColor: "rgb(244, 244, 244)" }}>
            <Bar data={test} options={options2} />
          </Card>
        </div>
      </Row>
      
    </div>
  )
}

export default Dev_Performance_default
