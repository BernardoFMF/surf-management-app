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