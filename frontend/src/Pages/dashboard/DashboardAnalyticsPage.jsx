import React, { useEffect, useState } from 'react'
import QuotasChartWrapper from '../../components/chartWrappers/QuotasChartWrapper'
import UpcomingEventsChartWrapper from '../../components/chartWrappers/UpcomingEventsChartWrapper'
import NewUsersChartWrapper from '../../components/chartWrappers/NewUsersChartWrapper'
import SportsWrapper from '../../components/chartWrappers/SportsWrapper'
import { gridSpacing } from '../../store/constants/themeConstants'
import { Grid } from '@mui/material'
import CandidatesCardChart from '../../components/charts/CandidatesCardChart';
import CompaniesCardChart from '../../components/charts/CompaniesCardChart';
import UsersCardChart from '../../components/charts/UsersCardChart';
import AnimatedPage from '../../components/AnimatedPage'
import Meta from '../../components/Meta'
import { useTranslation } from 'react-i18next'

const DashboardAnalyticsPage = () => {
    const { t } = useTranslation()
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
        "members": {
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
        },
        "sports": {
            "describers": [
                {
                    "id": 1,
                    "name": "Sport 1",
                    "gender": {
                        "male": 55,
                        "female": 30,
                        "other": 20
                    }
                },
                {
                    "id": 2,
                    "name": "Sport 2",
                    "gender": {
                        "male": 26,
                        "female": 14,
                        "other": 8
                    }
                }
            ]
        },
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
        },
        "companies": {
            "total": 20,
        },
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
        },
        "sportsV2": {
            "describers": [
                {
                    "id": 1,
                    "name": "Sport 1",
                    "total_males": 50,
                    "total_females": 20,
                    "total_other": 3,
                    "gender_distribution": [
                        {
                            "type": "Coach",
                            "gender_distribution": {
                                "male": 5,
                                "female": 10,
                                "other": 2
                            }
                        },
                        {
                            "type": "Jury",
                            "gender_distribution": {
                                "male": 2,
                                "female": 14,
                                "other": 1
                            }
                        }
                    ]
                },
                {
                    "id": 1,
                    "name": "Sport 2",
                    "total_males": 10,
                    "total_females": 30,
                    "total_other": 1,
                    "gender_distribution": [
                        {
                            "type": "Coach",
                            "gender_distribution": {
                                "male": 1,
                                "female": 12,
                                "other": 3
                            }
                        },
                        {
                            "type": "Jury",
                            "gender_distribution": {
                                "male": 2,
                                "female": 14,
                                "other": 1
                            }
                        }
                    ]
                },
            ]
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [])

    return (
        <>
            <Meta title={t('analytics_page_title')}/>
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
                        <Grid item xs={4} md={4}>
                            <AnimatedPage>
                                <UsersCardChart isLoading={loading} total={unformattedData.users.total} total_males={unformattedData.users.total_males} total_females={unformattedData.users.total_females} total_other={unformattedData.users.total_other} distribution={unformattedData.users.distribution} />
                            </AnimatedPage>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <AnimatedPage>
                                <CompaniesCardChart isLoading={loading} total={unformattedData.companies.total} />
                            </AnimatedPage>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <AnimatedPage>
                                <CandidatesCardChart isLoading={loading} total={unformattedData.candidates.total} total_males={unformattedData.candidates.total_males} total_females={unformattedData.candidates.total_females} total_other={unformattedData.candidates.total_other} distribution={unformattedData.candidates.distribution} />
                            </AnimatedPage>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={4}>
                            <SportsWrapper
                                loading={loading}
                                dropdownOptions={unformattedData.sports.describers.map(obj => { let newObj = { label: obj.name, value: obj.id}; return newObj })} 
                                data={unformattedData.sports.describers.map(obj => { let newObj = { id: obj.id, gender: obj.gender}; return newObj })} 
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <NewUsersChartWrapper 
                                loading={loading}
                                dropdownOptions={unformattedData.members.years} 
                                growth={unformattedData.members.member_growth} 
                                data={unformattedData.members.data} 
                            />                        
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
        
        
    )
}

export default DashboardAnalyticsPage