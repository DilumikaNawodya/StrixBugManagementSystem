import React, { useState,useEffect} from 'react'
import { Bar} from 'react-chartjs-2'
import { reportService } from '../../../Services/ReportService';

function IssuesWeekdays() {

    const [issues, setIssues] = useState({})

    useEffect(() => {


        let IssuesOpened = [];
        let IssuesClosed = [];

        reportService.Opened_ClosedIssues().map(obj=>{
            IssuesClosed.push(parseInt(obj.NoIClose));
            IssuesOpened.push(parseInt(obj.NoIOpen));
        })
          
        console.log(IssuesOpened,IssuesClosed)
    
        setIssues({
            labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'],
            datasets: [
                {
                    label: 'Issues Opened',
                    data: IssuesOpened,
                    borderColor: ['rgba(255,206,86,0.2)'],
                    backgroundColor: 'rgb(92, 184, 92)',
                    pointBorderColor: 'rgb(41, 43, 44)'
                },
                {
                    label: 'Issues Closed',
                    data: IssuesClosed,
                    borderColor: ['rgb(217, 83, 79)'],
                    backgroundColor: 'rgb(217, 83, 79)',
                    pointBorderColor: 'rgb(217, 83, 79)'
                }
            ]
        })
    }, [])


    const options={
        title:{
            display:true,
            text:'Issues Opened and Closed'
        },
        scales:{
            yAxes:[
                {
                    ticks: {
                        min:0,
                        max: 10,
                        stepSize:2
                    }
                }
            ]
        }
    }
    return (
        <div>
            <Bar data={issues}
                options={options}
                height={130} />
        </div>
    )
}

export default IssuesWeekdays;

