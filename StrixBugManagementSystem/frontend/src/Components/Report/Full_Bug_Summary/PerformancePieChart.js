import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2';

import {Report} from '../../../Services/Reports/BugSummary/PerformancePie';

function Perf() {

    const [issues, setIssues] = useState({})

    useEffect(() => {
        let result = null;
        let id = []
        let proj = []
        let iss = []

        for (let obj of Report.PerfPie()) {
            iss.push(parseInt(obj.amount))
            id.push(obj.workstate)
            

        }
    
        setIssues(
            {
                labels:id,
                datasets: [
                    {
                        label: 'No of Issues ',
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
            text: "Developer Performance"
        },

    }
    return (
        <div>
            <Pie data={issues}
                options={options} />
        </div>
    )
}

export default Perf;
