import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UpcomingEventsChart from '../charts/UpcomingEventsChart'
import MainCard from '../cards/MainCard'
import { Grid, Typography, TextField, MenuItem, Button } from '@mui/material'
import { gridSpacing } from '../../store/constants/themeConstants'
import ColumnChartSkeleton from '../skeletons/ColumnChartSkeleton'
import AnimatedPage from '../AnimatedPage'
const QuotasChartWrapper = ({ loading, dropdownOptions, data, title, attendance }) => {

    const extractData = (id) => {
        const eventById = data.filter(obj => obj.id === id)
        let goingCount = 0, notgoingCount = 0, interestedCount = 0, unansweredCount = 0
        eventById.forEach(element => {
            if (element.state === 'going') goingCount += element.count
            else if (element.state === 'not going') notgoingCount += element.count
            else if (element.state === 'interested') interestedCount += element.count
            else unansweredCount += element.count

        });
        return [goingCount, notgoingCount, interestedCount, unansweredCount]
    }
    const {t, i18n} = useTranslation()


    const [value, setValue] = useState(Math.min(...(dropdownOptions.map(option => option.value))));
    const [chartValues, setChartValues] = useState(extractData(Math.min(...(dropdownOptions.map(option => option.value)))))

    const changeData = (e) => {
        setChartValues(extractData(e.target.value))
        setValue(e.target.value)
    }

    return (
        <>
            {loading ? (
                <ColumnChartSkeleton />
            ) : (
                    <MainCard sx={{ height: '100%' }}>
                        <AnimatedPage>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography variant="subtitle2">{title}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid item>
                                            <TextField
                                                id="standard-select-quotas"
                                                select
                                                value={value}
                                                onChange={changeData}
                                            >
                                                {dropdownOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <UpcomingEventsChart data={!attendance ? chartValues : [attendance.going, attendance.not_going, attendance.interested, attendance.none]} />
                            </Grid>
                        </Grid>
                        </AnimatedPage>
                    </MainCard>
            )}
        </>
    )
}

export default QuotasChartWrapper