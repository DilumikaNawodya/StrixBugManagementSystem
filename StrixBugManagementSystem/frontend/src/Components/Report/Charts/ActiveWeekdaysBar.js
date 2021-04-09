import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { reportService } from '../../../Services/ReportService';

function ActiveWeekdaysBar() {

    const [hrs, setHrs] = useState([])

    useEffect(() => {

        setHrs(
            {
                labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'],
                datasets: [
                    {
                        label: 'Active Week Days ',
                        data: reportService.ActiveHoursWeekDays(),
                        borderColor: [
                            'rgba(255,206,86,0.2)',
                            'rgba(255,206,86,0.2)',
                            'rgba(255,206,86,0.2)',
                            'rgba(255,206,86,0.2)',
                            'rgba(255,206,86,0.2)'
                        ],
                        backgroundColor: [
                            'rgba(54,162,235,1)',
                            'rgba(54,162,235,1)',
                            'rgba(54,162,235,1)',
                            'rgba(54,162,235,1)',
                            'rgba(54,162,235,1)',

                        ],
                        pointBorderColor: 'rgba(255,206,86,0.2)'
                    },

                ]

            }
        )
    }, [])


    const options = {
        title: {
            display: true,
            text: 'Active Week days (Total Hours Worked)'
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 50,
                        stepSize: 10
                    }
                }
            ]
        }
    }
    return (
        <div>
            <Bar data={hrs}
                options={options}
                height={200}
            />
        </div>

    )
}

export default ActiveWeekdaysBar;
