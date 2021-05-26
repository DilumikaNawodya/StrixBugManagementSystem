import React from 'react'
import API from '../../Base'

function BugSumNum() {
    return API.get('/BugSummary/')
}

export default BugSumNum
