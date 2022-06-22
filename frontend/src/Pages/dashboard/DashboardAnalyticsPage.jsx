import { Grid } from '@mui/material';
import React from 'react'
import { useEffect, useState } from 'react';

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
    const quotaData = {
        series: [{
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43]
        }, {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27]
        }, {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14]
        }, {
            name: 'PRODUCT D',
            data: [21, 7, 25, 13, 22, 8]
        }],
        categories: [
            '01/01/2011 GMT', 
            '01/02/2011 GMT', 
            '01/03/2011 GMT', 
            '01/04/2011 GMT',
            '01/05/2011 GMT', 
            '01/06/2011 GMT'
        ]
    }

    const sportData = {
        series: [44, 55, 41, 17, 15]
    }

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

    return (
        <>
            <Grid container justifyContent={'center'} direction={ { xs: "column", md: "row"} }spacing={2}>
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
        </>
    )
}

export default DashboardAnalyticsPage