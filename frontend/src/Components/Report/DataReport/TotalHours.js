import React,{useState, useEffect} from 'react'
import { reportService } from '../../../Services/ReportService';


function TotalHours(){

    const [totalhrs, setTotalhrs] = useState([]);

    useEffect(()=>{
        setTotalhrs(
            reportService.TotalHours
        )
    },[])

    return (
        <div>
            {totalhrs.map(t => {
                return (
                    <div key={t.totalHours}>
                        <center> <h3 className="text-primary">{t.totalHours}</h3></center>
                        <center> <p>DEV <b>{t.Devhrs}</b> | QA <b>{t.QAhrs} </b></p> </center>
                        <p></p>
                    </div>
                );
            })}
        </div>
    )
}
export default TotalHours;
