import React, { useEffect, useState } from 'react'
import MainCard from '../cards/MainCard'
import { Grid, Typography, TextField, MenuItem, Button } from '@mui/material'
import { gridSpacing } from '../../store/constants/themeConstants'
import NewUsersChart from '../charts/NewUsersChart'
import ColumnChartSkeleton from '../skeletons/ColumnChartSkeleton'

const NewUsersChartWrapper = ({ loading, dropdownOptions, growth, data }) => {
    const extractData = (year) => {
        const yearData = data.filter(obj => obj.id === year)[0]
        return yearData
    }

    const extractGrowth = (year) => {
        const idx = dropdownOptions.findIndex(obj => obj === year)
        return growth[idx]
    }

    const [value, setValue] = useState(Math.max(...dropdownOptions), data);
    const [yearGrowth, setYearGrowth] = useState(extractGrowth(Math.max(...dropdownOptions)));
    const [chartValues, setChartValues] = useState(extractData(Math.max(...dropdownOptions)))

    const changeData = (e) => {
        setChartValues(extractData(e.target.value))
        setYearGrowth(extractGrowth(e.target.value))
        setValue(e.target.value)
    }

    return (
        <>
            {loading ? (
                <ColumnChartSkeleton />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">{`Total member growth in ${value}`}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3" color={yearGrowth < 0 ? 'secondary' : 'primary'}>{yearGrowth}%</Typography>
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
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <NewUsersChart data={chartValues.series} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    )
}

export default NewUsersChartWrapper