import React , {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import {Card} from 'react-bootstrap'
import API from '../../../Services/Base';

export default function ProjectBugDev() {
    const [projectbugs, setProjectBugs] =  useState([]);

    const getData = async () =>{
        const headers = { 
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
        };
        API.post('/ProjectBugDevelopment/', {}, { headers })
            .then(response => setProjectBugs(response))
            .catch((error) => console.log(error));
    }
    useEffect(() => {
          getData();
      }, []);

      if(projectbugs.data  != null){
       
        let project = projectbugs.data.data.map(e=>e.project__projectname)
        let open_bugs =projectbugs.data.data.map(e =>e.open)
        let in_progress = projectbugs.data.data.map(e=>e.in_progress)
        let resolved =projectbugs.data.data.map(e=>e.resolved)

        for(let i =0 ; i<project.length; i++){
  
        
      }
   

    setProjectBugs({
        
        labels: project,
        datasets: [
           
              {
                label: "Resolved",
                data:resolved,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor:  'rgb(255, 99, 132,0.7)',
                hoverBorderWidth: 1,
                //hoverBorderColor: "lightgrey",
                stack: 1
              },
              {
                label: "Total In Progress",
                data:in_progress,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: "rgba(75, 192, 192,0.8)",
                hoverBorderWidth: 1,
             
                stack:1
              },
              {
                label: "Open Bugs",
                data:open_bugs,
                backgroundColor: "rgba(255,206,90,0.5)",
                bordergroundColor: "rgba(255,206,90,1)",
                hoverBorderWidth: 2,
             
                stack:1
              },
        ],
      });
      
    
    }
    const options2 = {
        title: {
          display: true,
          text: "Project x Bug Development",
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
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <Card   style={{backgroundColor:"rgb(240, 240, 240)"}}  > 
                       <Bar data={projectbugs} options={options2}></Bar> 
                    </Card>
                </div>
                
        </div>
    )
}
