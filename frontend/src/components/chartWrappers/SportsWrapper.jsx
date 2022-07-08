import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MainCard from '../cards/MainCard'
import { Grid, Typography, TextField, MenuItem } from '@mui/material'
import { gridSpacing } from '../../store/constants/themeConstants'
import PieChartSkeleton from '../skeletons/PieChartSkeleton'
import SportsChart from '../charts/SportsChart'
import AnimatedPage from '../AnimatedPage'
const SportsWrapper = ({ loading, dropdownOptions, data }) => {
    const {t, i18n} = useTranslation()

    const extractData = (id) => {
        const sportById = data.filter(obj => obj.id === id)
        let maleCount = 0, femaleCount = 0, otherCount = 0
        sportById.forEach(element => {
            if (element.gender === 'Male') maleCount += element.count
            else if (element.gender === 'Female') femaleCount += element.count
            else if (element.gender === 'Other') otherCount += element.count

        });
        return [maleCount, femaleCount, otherCount]
    }

    const [value, setValue] = useState(Math.min(...(dropdownOptions.map(option => option.value))));
    const [chartValues, setChartValues] = useState(extractData(Math.min(...(dropdownOptions.map(option => option.value)))))

    const changeData = (e) => {
        setChartValues(extractData(e.target.value))
        setValue(e.target.value)
    }

    return (
        <>
            {loading ? (
                <PieChartSkeleton />
            ) : (
                <MainCard sx={{ height: '100%' }}>
                    <AnimatedPage>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">{t('sports')}</Typography>
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
                            <SportsChart data={chartValues} />
                        </Grid>
                    </Grid>
                    </AnimatedPage>
                </MainCard>
            )}
        </>
    )
}

export default SportsWrapper