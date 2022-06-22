import React, { useEffect, useState } from 'react'
import QuotasChartWrapper from '../../components/chartWrappers/QuotasChartWrapper'
import UpcomingEventsChartWrapper from '../../components/chartWrappers/UpcomingEventsChartWrapper'
import NewUsersChartWrapper from '../../components/chartWrappers/NewUsersChartWrapper'
import { gridSpacing } from '../../store/constants/themeConstants'
import { Grid } from '@mui/material'

const DashboardAnalyticsPage = () => {
    const [loading, setLoading] = useState(true)
    const unformattedData = {
        "quotas": {
            "years": [ 2022, 2001 ],
            "amounts": [3000, 5000],
            "total_amount": [12000, 20000],
            "data": [
                {
                    "id": 2022,
                    "series": [
                        {
                            "name": "paid",
                            "data": [ 50, 100, 200, 400, 50, 100, 200, 400, 50, 100, 200, 400 ]
                        },
                        {
                            "name": "not_paid",
                            "data": [ 50, 100, 200, 0, 50, 100, 200, 400, 50, 100, 200, 400 ]
                        }
                    ]
                },
                {
                    "id": 2001,
                    "series": [
                        {
                            "name": "paid",
                            "data": [ 50, 1000, 200, 400, 50, 100, 200, 400, 50, 1006, 200, 400 ]
                        },
                        {
                            "name": "not_paid",
                            "data": [ 500, 100, 200, 400, 504, 1004, 200, 400, 50, 100, 200, 400 ]
                        }
                    ]
                }
            ]
        },
        "users": {
            "years": [ 2022, 2001 ],
            "member_growth": [-11, 0.2],
            "data": [
                {
                    "id": 2022,
                    "series": [
                        {
                            "name": "new_users",
                            "data": [ 10, 15, 2, 4, 50, 12, 15, 47, 20, 0, 6, 10 ]
                        }
                    ]
                },
                {
                    "id": 2001,
                    "series": [
                        {
                            "name": "new_users",
                            "data": [ 15, 10, 12, 24, 5, 21, 1, 7, 0, 4, 10, 6 ]
                        }
                    ]
                }
            ]
        },
        "upcoming_events": {
            "describers": [
                {
                    "id": 1,
                    "name": "Evento 1",
                    "attendance": {
                        "going": 55,
                        "not_going": 30,
                        "interested": 20,
                        "unanswered": 5
                    }
                },
                {
                    "id": 2,
                    "name": "Evento 2",
                    "attendance": {
                        "going": 10,
                        "not_going": 10,
                        "interested": 50,
                        "unanswered": 0
                    }
                }
            ]
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <QuotasChartWrapper 
                            loading={loading} 
                            dropdownOptions={unformattedData.quotas.years} 
                            totalAmount={unformattedData.quotas.total_amount} 
                            amounts={unformattedData.quotas.amounts} 
                            data={unformattedData.quotas.data} 
                        />                        
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <UpcomingEventsChartWrapper 
                            loading={loading}
                            dropdownOptions={unformattedData.upcoming_events.describers.map(obj => { let newObj = { label: obj.name, value: obj.id}; return newObj })} 
                            data={unformattedData.upcoming_events.describers.map(obj => { let newObj = { id: obj.id, attendance: obj.attendance}; return newObj })} 
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12} md={8}>
                    <NewUsersChartWrapper 
                        loading={loading}
                        dropdownOptions={unformattedData.users.years} 
                        growth={unformattedData.users.member_growth} 
                        data={unformattedData.users.data} 
                    />                        
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardAnalyticsPage