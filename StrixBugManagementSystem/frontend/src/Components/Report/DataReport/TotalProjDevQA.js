import React ,{useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import { reportService } from '../../../Services/ReportService';



function TotalProjDevQA() {
    const [project, setProject] = useState([]);

    useEffect(()=>{
        setProject(
            reportService.TotalEmployee
        )   
    },[])

    console.log(project)

    return (
        <div>

            {project.map(t => {
                return (
                    <div key={t.Totalprojects}>
                        <center><b>Total Projects</b> <h1 className="text-primary">{t.Totalprojects}</h1></center>
                        <div className="col">
                            <Card className="shadow-lg p-2 mb-3 bg-white rounded"><center> <h6 className="">Total No of Dev: {t.TotalDev}</h6></center></Card>
                        </div>
                        <div className="col">
                            <Card className="shadow-lg p-2 mb-2 bg-white rounded"><center><h6> Total No of QA: {t.TotalQA}</h6></center></Card>
                        </div>

                    </div>
                );
            })}

        </div>
    );
}
export default TotalProjDevQA;
