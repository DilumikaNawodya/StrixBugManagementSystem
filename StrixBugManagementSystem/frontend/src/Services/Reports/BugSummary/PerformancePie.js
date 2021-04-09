const data ={
    "perf":[
        {
            "workstate": "Total Assigned",
            "amount": 20
        },
        {
            "workstate": "Total Completed",
            "amount": 12
        },
        {
            "workstate": "Total In Progress",
            "amount": 8
        }
        
    ]
}


export const Report ={PerfPie};

function PerfPie(){
    return data.perf
}