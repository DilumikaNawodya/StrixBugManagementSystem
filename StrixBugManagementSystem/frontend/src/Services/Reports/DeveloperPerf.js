import React from 'react'

function DevPerformance() {
    return fetch('http://127.0.0.1:8000/api/DeveloperPerformance/')
    .then(data => data.json())
}

export default DevPerformance
