import React from 'react'

function BugSumNum() {
    return fetch('http://127.0.0.1:8000/api/BugSummary/')
    .then(data => data.json())
}

export default BugSumNum
