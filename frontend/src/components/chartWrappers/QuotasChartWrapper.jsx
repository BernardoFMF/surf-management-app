import React, { useEffect, useState } from 'react'
import QuotasChart from '../charts/QuotasChart'
import MainCard from '../cards/MainCard'
import { Grid, Typography, TextField, MenuItem, Button } from '@mui/material'
import { gridSpacing } from '../../store/constants/themeConstants'
import ColumnChartSkeleton from '../skeletons/ColumnChartSkeleton'
import AnimatedPage from '../AnimatedPage'
import { useTranslation } from 'react-i18next'

const QuotasChartWrapper = ({ loading, dropdownOptions, totalAmount, amounts, data }) => {
    const {t, i18n} = useTranslation()

    const extractAmounts = (year) => {
        const idx = dropdownOptions.findIndex(obj => obj === year)
        const newData = {
            paidTotal: amounts[idx],
            notPaidTotal: totalAmount[idx] - amounts[idx]
        }
        return newData
    }
    
    const extractData = (year) => {
        const yearData = data.filter(obj => parseInt(obj.year_) === year)
        let series = [{"name": year, "data" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}]
        yearData.forEach(element => {
            series[0].data[parseInt(element.month_) - 1] = parseInt(element.sum)
        });
        return series
    }
    
    const [value, setValue] = useState(Math.max(...dropdownOptions));
    const [chartValues, setChartValues] = useState(extractData(Math.max(...dropdownOptions)))
    const [yearAmounts, setYearAmounts] = useState(extractAmounts(Math.max(...dropdownOptions)))
    const [typeValue, setTypeValue] = useState(false)

    const changeData = (e) => {
        setChartValues(extractData(e.target.value))
        setYearAmounts(extractAmounts(e.target.value))
        setValue(e.target.value)
    }

    const handleChangeType = (event, newValue) => {
        setTypeValue(newValue)
    }

    return (
        <>
            {loading ? (
                <ColumnChartSkeleton />
            ) : (
                <MainCard>
                    <AnimatedPage>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Button
                                                disableElevation
                                                variant={typeValue ? 'text' : 'contained'}
                                                size="small"
                                                sx={{ color: typeValue ? 'inherit' : 'white' }}
                                                onClick={(e) => handleChangeType(e, false)}
                                            >
                                                {`${t('Total amount paid in')} ${value}`}
                                            </Button>
                                            <Button
                                                disableElevation
                                                variant={!typeValue ? 'text' : 'contained'}
                                                size="small"
                                                sx={{ color: !typeValue ? 'inherit' : 'white' }}
                                                onClick={(e) => handleChangeType(e, true)}
                                            >
                                                {`${t('Total amount left to be paid in')} ${value}`}
                                            </Button>
                                            <Grid item>
                                                <Typography mt={1} variant="h3">{typeValue ? yearAmounts.notPaidTotal : yearAmounts.paidTotal}€</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={gridSpacing}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <QuotasChart data={chartValues} />
                        </Grid>
                    </Grid>
                    </AnimatedPage>
                </MainCard>
            )}
        </>
    )
}

export default QuotasChartWrapper