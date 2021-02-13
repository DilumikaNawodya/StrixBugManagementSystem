import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2';

import { reportService } from '../../../Services/ReportService';

function TotalIssuesPieCharts() {

    const [issues, setIssues] = useState({})

    useEffect(() => {
        let result = null;
        let id = []
        let proj = []
        let iss = []

        for (let obj of reportService.NoOfIssuesProject()) {
            iss.push(parseInt(obj.NoIssues))
            id.push(obj.pID)
            proj.push(obj.Pname)

        }
    
        setIssues(
            {
                labels: proj,
                datasets: [
                    {
                        label: 'No of Issues projects',
                        data: iss,
                        backgroundColor: [
                            'rgba(255,99,132,1)',
                            'rgba(255,206,90,1)',
                            'rgba(54,162,235,1)',
                            'rgba(25,159,64,1)',
                            'rgba(153,102,255,1)',

                        ],
                        pointBorderColor: 'rgba(255,206,86,0.2)'
                    }

                ]
            }
        )
    }, [])

    const options = {
        title: {
            display: true,
            text: "Number of Issues along with Projects"
        },

    }
    return (
        <div>
            <Pie data={issues}
                options={options} />
        </div>
    )
}

export default TotalIssuesPieCharts;
