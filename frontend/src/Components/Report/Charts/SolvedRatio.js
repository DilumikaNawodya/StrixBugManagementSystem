import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { reportService } from '../../../Services/ReportService';

function SolvedRatio() {

    const [sratio, setsratio] = useState({});

    useEffect(()=>{ 

        let result = null

        for(let obj of reportService.SolvedRatio()){
            result = Object.values(obj)
        }

        setsratio(
            {
                labels: ['Solved Issues', 'In Progress', 'Solved'],
                datasets: [
                    {
                        label: 'Issues',
                        data: result,
                        backgroundColor: [
                            'rgb(217, 83, 79)',
                            'rgba(54,162,235,1)',
                            'rgba(255,206,90,1)'
                        ],
                        pointBorderColor: 'rgba(255,206,86,0.2)'
                    }
                ]
            }
        )
    },[])

    // useEffect(() => {
    //     const fetchratio = async () => {
    //         let result = null;
    //         axios.get(' http://localhost:3333/Issues')
    //             .then(res => {
    //                 console.log(res.data)
                    // for (let obj of res.data) {
                    //     console.log(obj)
                    //     result = Object.values(obj)

                    // }
    //                 console.log(result)
                    // setsratio(
                    //     {
                    //         labels: ['Solved Issues', 'In Progress', 'Solved'],
                    //         datasets: [
                    //             {
                    //                 label: 'Issues',
                    //                 data: result,
                    //                 backgroundColor: [
                    //                     'rgb(217, 83, 79)',
                    //                     'rgba(54,162,235,1)',
                    //                     'rgba(255,206,90,1)'
                    //                 ],
                    //                 pointBorderColor: 'rgba(255,206,86,0.2)'
                    //             }
                    //         ]
                    //     }
                    // )
    //             })
    //     }
    //     fetchratio();
    // }, [])

    return (
        <div>
            <Doughnut
                data={sratio}
            />
        </div>
    )
}

export default SolvedRatio;



