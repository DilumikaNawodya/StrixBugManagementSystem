import React , {useState, useEffect} from 'react'
import { Bar} from 'react-chartjs-2';
import { Card, Badge,Button, Row, Col,Dropdown, Tabs, Tab } from 'react-bootstrap';
import API from '../../../Services/Base';

function Month_BugDev() {

    const [monthbugs, setMonthBugs] =  useState([]);
    const [monthTotalbugs, setMonthTotalBugs] =  useState([]);

    const getData = async () =>{
        const headers = { 
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
        };
        API.post('/MonthBugDevelopment/', {}, { headers })
            .then(response => setMonthBugs(response))
            .catch((error) => console.log(error));
    }
    useEffect(() => {
          getData();
      }, []);

    if(monthbugs.data  != null){
        let month_date =  monthbugs.data.data.map(e=>e.date__month)
        let total_bugs = monthbugs.data.data.map(e =>e.total_bugs)
        let in_progress =  monthbugs.data.data.map(e=>e.in_progress)
        let resolved = monthbugs.data.data.map(e=>e.resolved)

        for(let i =0 ; i<month_date.length; i++){
  
          switch(month_date[i]){
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
   

    setMonthBugs({
        
        labels: month_date,
        datasets: [
            {
              label: "Total In-Progress",
              data:in_progress,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              hoverBorderWidth: 2,
              stack:1
            },
            {
              label: "Resolved",
              data:resolved,
              backgroundColor: 'rgba(255, 99, 132, 0.4)',
              borderColor:  'rgb(255, 99, 132,0.7)',
              hoverBorderWidth: 2,
              stack: 1
            },
         
        ],
      });
      setMonthTotalBugs({
        
        labels: month_date,
        datasets: [
            {
              label: "Total Bugs",
              data:total_bugs,
              backgroundColor: "rgb(92, 184, 92, 0.6)",
              borderColor: "rgb(92, 184, 92,0.8)",
              hoverBorderWidth: 2,
              stack:1
            },
        ],
      });
      
    
    }
    const options2 = {
        title: {
          display: true,
          text: "Month x Bug Development",
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
      const optionsTotalBugs = {
        title: {
          display: true,
          text: "Month x Total Bugs",
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
          <Row style={{marginBottom:20 }}> 
              <div className="col-md-6 col-sm-12 col-xs-12" style={{marginBottom:20 , marginTop:20}}>
                  <Card style={{margin:10}} style={{backgroundColor:"rgb(240, 240, 240)"}}  > 
                  <Bar data={monthbugs} options={options2} />
                  </Card>
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12"  style={{marginBottom:20 , marginTop:20}}>
                  <Card style={{margin:10}} style={{backgroundColor:"rgb(240, 240, 240)"}}>
                  <Bar data={monthTotalbugs} options={optionsTotalBugs} />
                  </Card>
              </div>
          </Row>
        </div>
    )

}
export default Month_BugDev
