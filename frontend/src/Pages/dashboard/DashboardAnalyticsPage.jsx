import { Grid } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import MainCard from '../../components/cards/MainCard';
import QuotasChart from '../../components/charts/QuotasChart'
import SportsChart from '../../components/charts/SportsChart';

const DashboardAnalyticsPage = () => {
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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs="auto">
                    <MainCard title={'Quotas'}>
                        <QuotasChart data={quotaData}/>
                    </MainCard> 
                </Grid>
                <Grid item xs="auto">
                    <MainCard title={'Sports'}>
                        <SportsChart data={sportData}/>
                    </MainCard>   
                </Grid>
                
            </Grid>
           
        </>
    )
}

export default DashboardAnalyticsPage