import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { getStatistics } from '../../store/actions/statisticActions'
import { STATISTICS_FETCH_RESET } from '../../store/constants/statisticConstants'
import Box from '@mui/material/Box';
import {Alert} from '@mui/material'

const DashboardAnalyticsPage = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getStatistics())
        return () => {
            dispatch({ type: STATISTICS_FETCH_RESET })
        }
    }, [])

    const statistics = useSelector((state) => state.statisticsFetch)
    const { loading, error, statisticsGet } = statistics

    const unformattedData = {
        "quotas": {
            "years": [
                2023,
                2022
            ],
            "amounts": [
                150
            ],
            "total_amount": [
                30,
                480
            ],
            "data": [
                {
                    "sum": "25",
                    "month_": "1",
                    "year_": "2023"
                },
                {
                    "sum": "45",
                    "month_": "2",
                    "year_": "2023"
                },
                {
                    "sum": "35",
                    "month_": "3",
                    "year_": "2023"
                },
                {
                    "sum": "44",
                    "month_": "4",
                    "year_": "2023"
                },
                {
                    "sum": "25",
                    "month_": "5",
                    "year_": "2023"
                },
                {
                    "sum": "15",
                    "month_": "6",
                    "year_": "2023"
                },
                {
                    "sum": "53",
                    "month_": "7",
                    "year_": "2023"
                },
                {
                    "sum": "23",
                    "month_": "8",
                    "year_": "2023"
                },
                {
                    "sum": "12",
                    "month_": "9",
                    "year_": "2023"
                },
                {
                    "sum": "33",
                    "month_": "10",
                    "year_": "2023"
                },
                {
                    "sum": "25",
                    "month_": "11",
                    "year_": "2023"
                },
                {
                    "sum": "65",
                    "month_": "12",
                    "year_": "2023"
                }
            ]
        },
        "members": {
            "years": [
                2022,
                2021
            ],
            "member_growth": [
                30,
                76
            ],
            "data": [
                {
                    "count": "16",
                    "month_": "1",
                    "year_": "2022"
                },
                {
                    "count": "32",
                    "month_": "2",
                    "year_": "2022"
                },
                {
                    "count": "7",
                    "month_": "3",
                    "year_": "2022"
                },
                {
                    "count": "19",
                    "month_": "4",
                    "year_": "2022"
                },
                {
                    "count": "5",
                    "month_": "5",
                    "year_": "2022"
                },
                {
                    "count": "45",
                    "month_": "6",
                    "year_": "2022"
                },
                {
                    "count": "64",
                    "month_": "7",
                    "year_": "2022"
                },
                {
                    "count": "76",
                    "month_": "8",
                    "year_": "2022"
                },
                {
                    "count": "2",
                    "month_": "9",
                    "year_": "2022"
                },
                {
                    "count": "12",
                    "month_": "10",
                    "year_": "2022"
                },
                {
                    "count": "87",
                    "month_": "11",
                    "year_": "2022"
                },
                {
                    "count": "34",
                    "month_": "12",
                    "year_": "2022"
                },
                {
                    "count": "16",
                    "month_": "1",
                    "year_": "2021"
                },
                {
                    "count": "32",
                    "month_": "2",
                    "year_": "2021"
                },
                {
                    "count": "7",
                    "month_": "3",
                    "year_": "2021"
                },
                {
                    "count": "19",
                    "month_": "4",
                    "year_": "2021"
                },
                {
                    "count": "5",
                    "month_": "5",
                    "year_": "2021"
                },
                {
                    "count": "45",
                    "month_": "6",
                    "year_": "2021"
                },
                {
                    "count": "64",
                    "month_": "7",
                    "year_": "2021"
                },
                {
                    "count": "76",
                    "month_": "8",
                    "year_": "2021"
                },
                {
                    "count": "2",
                    "month_": "9",
                    "year_": "2021"
                },
                {
                    "count": "12",
                    "month_": "10",
                    "year_": "2021"
                },
                {
                    "count": "87",
                    "month_": "11",
                    "year_": "2021"
                },
                {
                    "count": "34",
                    "month_": "12",
                    "year_": "2021"
                }
            ]
        },
        "users": [
            {
                "count": "55",
                "nationality_": "Portuguese",
                "gender_": "Male"
            },
            {
                "count": "25",
                "nationality_": "Portuguese",
                "gender_": "Other"
            }
        ],
        "companies": [
            {
                "count": "15"
            }
        ],
        "candidates": [
            {
                "count": "65",
                "nationality_": "Portuguese",
                "gender_": "Female"
            },
            {
                "count": "86",
                "nationality_": "Portuguese",
                "gender_": "Male"
            },
            {
                "count": "23",
                "nationality_": "Portuguese",
                "gender_": "Other"
            }
        ],
        "sports": [
            {
                "count": "27",
                "id_": 8,
                "name_": "Kiteboarding",
                "gender_": "Male"
            },
            {
                "count": "32",
                "id_": 9,
                "name_": "Paddleboarding",
                "gender_": "Male"
            },
            {
                "count": "16",
                "id_": 1,
                "name_": "Surfing",
                "gender_": "Male"
            },
            {
                "count": "12",
                "id_": 1,
                "name_": "Surfing",
                "gender_": "Female"
            },
            {
                "count": "16",
                "id_": 4,
                "name_": "Wakeboard",
                "gender_": "Male"
            },
            {
                "count": "74",
                "id_": 6,
                "name_": "Windsurf",
                "gender_": "Male"
            },
            {
                "count": "34",
                "id_": 3,
                "name_": "Bodysurfing",
                "gender_": "Male"
            },
            {
                "count": "23",
                "id_": 7,
                "name_": "Rafting",
                "gender_": "Male"
            },
            {
                "count": "44",
                "id_": 5,
                "name_": "Finswimming",
                "gender_": "Male"
            },
            {
                "count": "23",
                "id_": 2,
                "name_": "Kneeboarding",
                "gender_": "Male"
            },
            {
                "count": "31",
                "id_": 10,
                "name_": "Canyoning",
                "gender_": "Male"
            },
            {
                "count": "87",
                "id_": 11,
                "name_": "Kayak Polo",
                "gender_": "Male"
            }
        ],
        "upcoming_events": [
            {
                "count": "20",
                "id_": 4,
                "name_": "ultra assembleia gera1 do impe231",
                "state_": null
            },
            {
                "count": "28",
                "id_": 4,
                "name_": "ultra assembleia gera1 do impe231",
                "state_": 'going'
            },
            {
                "count": "12",
                "id_": 4,
                "name_": "ultra assembleia gera1 do impe231",
                "state_": 'not going'
            }
        ]
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [])

    return (
        <>
            <Meta title={t('analytics_page_title')}/>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClick={() => dispatch({ type: STATISTICS_FETCH_RESET })}>{t(error)}</Alert></Box> }
            {
                loading === false && statisticsGet && 
                <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={8}>
                            <QuotasChartWrapper 
                                loading={isLoading} 
                                dropdownOptions={statisticsGet.quotas.years} 
                                totalAmount={statisticsGet.quotas.total_amount} 
                                amounts={statisticsGet.quotas.amounts} 
                                data={statisticsGet.quotas.data}
                            />                        
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <UpcomingEventsChartWrapper 
                                loading={isLoading}
                                title={t('Upcoming events attendance')}
                                dropdownOptions={statisticsGet.upcoming_events.map(obj => { let newObj = { label: obj.name_, value: obj.id_}; return newObj })} 
                                data={statisticsGet.upcoming_events.map(obj => { let newObj = { id: obj.id_, state: obj.state_, count: parseInt(obj.count)}; return newObj })} 
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent={'center'} direction={ { xs: "column", md: "row"} } spacing={2}>
                        <Grid item xs={4} md={4}>
                            <AnimatedPage>
                                <UsersCardChart isLoading={isLoading} obj={statisticsGet.users} />
                            </AnimatedPage>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <AnimatedPage>
                                <CompaniesCardChart isLoading={isLoading} obj={statisticsGet.companies} />
                            </AnimatedPage>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <AnimatedPage>
                                <CandidatesCardChart isLoading={isLoading} obj={statisticsGet.candidates} />
                            </AnimatedPage>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={4}>
                            <SportsWrapper
                                loading={isLoading}
                                dropdownOptions={statisticsGet.sports.map(obj => { let newObj = { label: obj.name_, value: obj.id_}; return newObj })} 
                                data={statisticsGet.sports.map(obj => { let newObj = { id: obj.id_, gender: obj.gender_, count: parseInt(obj.count)}; return newObj })} 
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <NewUsersChartWrapper 
                                loading={isLoading}
                                dropdownOptions={statisticsGet.members.years} 
                                growth={statisticsGet.members.member_growth} 
                                data={statisticsGet.members.data} 
                            />                        
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            }
            
        </>
        
        
    )
}

export default DashboardAnalyticsPage