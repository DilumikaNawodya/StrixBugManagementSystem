import React, { useState } from 'react'
import { Row, Card } from 'react-bootstrap'
import {Bar} from 'react-chartjs-2'
import API from '../Services/Base'

function test(){

    // const [labels, setLabels] = useState()
    // const [datasets, setDatasets] = useState()

    const monthDiff = (dateFrom, dateTo) => {
        return dateTo.getMonth() - dateFrom.getMonth() + 
            (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
    }

    API.post('/devperformance/',{
        projectid: 5,
        to: "2019-02-28",
        from: "2021-04-28"
    },{})
        .then(function(response){
            const arr = response.data.data

            console.log(
                monthDiff(
                    new Date(arr[0].date__year, arr[0].date__month),
                    new Date(arr[arr.length-1].date__year, arr[arr.length-1].date__month)
                ) + 1
            )
        })


    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            stack: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'My second dataset',
            backgroundColor: 'rgba(155,231,91,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            stack: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [45, 79, 10, 41, 16, 85, 20]
          }
        ]
    }

    const options = {
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
    }

    return (
        <Row style={{ marginBottom: 20 }}>
            <div className="col-md-12 col-sm-12 col-xs-12">
                <Card >
                    <Bar data={data} options={options} />
                </Card>
            </div>
        </Row>
    )
}

export default test