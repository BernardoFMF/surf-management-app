import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UpcomingEventsChart from '../charts/UpcomingEventsChart'
import MainCard from '../cards/MainCard'
import { Grid, Typography, TextField, MenuItem, Button } from '@mui/material'
import { gridSpacing } from '../../store/constants/themeConstants'
import ColumnChartSkeleton from '../skeletons/ColumnChartSkeleton'
import AnimatedPage from '../AnimatedPage'
const QuotasChartWrapper = ({ loading, dropdownOptions, data }) => {
    const extractData = (id) => {
        const idData = data.filter(obj => obj.id === id)[0]
        return [idData.attendance.going, idData.attendance.not_going, idData.attendance.interested, idData.attendance.unanswered]
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
                                                <Typography variant="subtitle2">{t('Upcoming events attendance')}</Typography>
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
                                <UpcomingEventsChart data={chartValues} />
                            </Grid>
                        </Grid>
                        </AnimatedPage>
                    </MainCard>
            )}
        </>
    )
}

export default QuotasChartWrapper