
const data = 
{
    "TotalHrs":[
        {
          
            "totalHours": "150h",
            "Devhrs": "87h",
            "QAhrs": "63h"
        }
    ],
    "TotalEmp":[
        {
            "Totalprojects": 7,
            "TotalDev" :5,
            "TotalQA" : 5
        }
    ],
    "Issues":[
        {
            "toalIssues": 16,
            "InProgress": 6,
            "solved":10
        }
    ],
    "Opened_ClosedIssues":[
        {
            "NoIOpen": 3,
            "NoIClose":2
        },
        {
            "NoIOpen": 2,
            "NoIClose":2
        },
        {
            "NoIOpen": 5,
            "NoIClose":3
        },
        {
            "NoIOpen":1,
            "NoIClose":2
        },
        {
            "NoIOpen": 5,
            "NoIClose":4
        }
    ],
    "NoIssuesProj":[
        {
            "pID": "P001",
            "Pname": "Project A",
            "NoIssues": 5
        },
        {
            "pID": "P002",
            "Pname": "Project B",
            "NoIssues": 7
        },
        {
            "pID": "P003",
            "Pname": "Project C",
            "NoIssues": 3
        },
        {
            "pID": "P004",
            "Pname": "Project D",
            "NoIssues": 1
        },
        {
            "pID": "P005",
            "Pname": "Project E",
            "NoIssues": 3
        }
        
    ],
    "ActiveHoursWeekDays":[20, 42, 23, 31,34]
  }

export const reportService = {
    TotalEmployee,
    TotalHours,
    SolvedRatio,
    Opened_ClosedIssues,
    NoOfIssuesProject,
    ActiveHoursWeekDays,
    BugSumNum
};

function BugSumNum() {
    return fetch('http://127.0.0.1:8000/BugSummary/')
    .then(data => data.json())
}

function TotalEmployee(){
    return data.TotalEmp
}

function TotalHours(){
    return data.TotalHrs
}

function SolvedRatio(){
    return data.Issues
}

function Opened_ClosedIssues(){
    return data.Opened_ClosedIssues
}

function NoOfIssuesProject(){
    return data.NoIssuesProj
}

function ActiveHoursWeekDays(){
    return data.ActiveHoursWeekDays
}