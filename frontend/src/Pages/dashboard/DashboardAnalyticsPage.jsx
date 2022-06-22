import React, { useEffect, useState } from 'react'
import QuotasChartWrapper from '../../components/chartWrappers/QuotasChartWrapper'
import UpcomingEventsChartWrapper from '../../components/chartWrappers/UpcomingEventsChartWrapper'
import NewUsersChartWrapper from '../../components/chartWrappers/NewUsersChartWrapper'
import { gridSpacing } from '../../store/constants/themeConstants'
import { Grid } from '@mui/material'

import { useParams } from 'react-router-dom';
import MainCard from '../../components/cards/MainCard';
import QuotasChart from '../../components/charts/QuotasChart'
import SportsChart from '../../components/charts/SportsChart';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import CandidatesCardChart from '../../components/charts/CandidatesCardChart';
import CompaniesCardChart from '../../components/charts/CompaniesCardChart';
import UsersCardChart from '../../components/charts/UsersCardChart';
import AnimatedCard from '../../components/AnimatedCard'

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

    const userData = {
        series:
            {
                "users": {
                    "total": 2500,
                    "total_males": 50,
                    "total_females": 20,
                    "total_other": 3,
                    "distribution": [
                        {
                            "nationality": "Portuguese",
                            "gender_distribution": {
                                "male": 5,
                                "female": 10,
                                "other": 2
                            }
                        },
                        {
                            "nationality": "Brazilian",
                            "gender_distribution": {
                                "male": 2,
                                "female": 11,
                                "other": 5
                            }
                        }
                    ]
                }
            }
        
    }

    const candidateData = {
        series:
            {
                "candidates": {
                    "total": 2500,
                    "total_males": 50,
                    "total_females": 20,
                    "total_other": 3,
                    "distribution": [
                        {
                            "nationality": "Portuguese",
                            "gender_distribution": {
                                "male": 5,
                                "female": 10,
                                "other": 2
                            }
                        },
                        {
                            "nationality": "Brazilian",
                            "gender_distribution": {
                                "male": 2,
                                "female": 11,
                                "other": 5
                            }
                        }
                    ]
                }
            }
        
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    /**
     *             <Grid container justifyContent={'center'} direction={ { xs: "column", md: "row"} }spacing={2}>
                <Grid item lg={7} md={6} sm={6} xs={12} >
                    <MainCard title={'Quotas'} sx={{ height: '100%' }}>
                        <QuotasChart data={quotaData}/>
                    </MainCard> 
                </Grid>
                <Grid item lg={4.5} md={6} sm={6} xs={12} >
                    <MainCard title={'Sports'} sx={{ height: '100%' }}>
                        <SportsChart data={sportData}/>
                    </MainCard>   
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} direction={ { xs: "column", md: "row"} } spacing={2} sx={{mt: 0.1}}>
                <Grid item xs={4} >
                    <UsersCardChart isLoading={loading} total={userData.series.users.total} total_males={userData.series.users.total_males} total_females={userData.series.users.total_females} total_other={userData.series.users.total_other} distribution={userData.series.users.distribution} />
                </Grid>
                <Grid item xs={3.5} >
                    <CompaniesCardChart isLoading={loading} data={userData} />
                </Grid>
                <Grid item xs={4} >
                    <CandidatesCardChart isLoading={loading} total={candidateData.series.candidates.total} total_males={candidateData.series.candidates.total_males} total_females={candidateData.series.candidates.total_females} total_other={candidateData.series.candidates.total_other} distribution={candidateData.series.candidates.distribution} />
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} direction={ { xs: "column", md: "row"} }spacing={2} sx={{mt: 0.1}}>
                <Grid item lg={4.5} md={6} sm={6} xs={12} >
                    <MainCard title={'Sports'} sx={{ height: '100%' }}>
                        <SportsChart data={sportData}/>
                    </MainCard>   
                </Grid>
                <Grid item lg={7} md={6} sm={6} xs={12} >
                    <MainCard title={'Quotas'} sx={{ height: '100%' }}>
                        <QuotasChart data={quotaData}/>
                    </MainCard> 
                </Grid> 
            </Grid>
     */

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
                <Grid container justifyContent={'center'} direction={ { xs: "column", md: "row"} } spacing={2}>
                    <Grid item xs={4} >
                        <UsersCardChart isLoading={loading} total={userData.series.users.total} total_males={userData.series.users.total_males} total_females={userData.series.users.total_females} total_other={userData.series.users.total_other} distribution={userData.series.users.distribution} />
                    </Grid>
                    <Grid item xs={3.5} >
                        <CompaniesCardChart isLoading={loading} data={userData} />
                    </Grid>
                    <Grid item xs={4} >
                        <CandidatesCardChart isLoading={loading} total={candidateData.series.candidates.total} total_males={candidateData.series.candidates.total_males} total_females={candidateData.series.candidates.total_females} total_other={candidateData.series.candidates.total_other} distribution={candidateData.series.candidates.distribution} />
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