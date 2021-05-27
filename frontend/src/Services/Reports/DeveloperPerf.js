import React from 'react'
import API from '../Base'

function DevPerformance() {
    return API.get('/DeveloperPerformance/')
}

export default DevPerformance
