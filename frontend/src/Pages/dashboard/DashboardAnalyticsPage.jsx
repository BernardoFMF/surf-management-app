import React from 'react'
import { useParams } from 'react-router-dom';

const DashboardAnalyticsPage = () => {
    const {id} = useParams()
  return (
    <div>
        <h2>hello</h2>
        <h1>{id}</h1>
    </div>
  )
}

export default DashboardAnalyticsPage