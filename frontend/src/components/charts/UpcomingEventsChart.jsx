import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'

const NewUsersChart = ({ data }) => {
    const { t } = useTranslation()
    const theme = useTheme();

    const primary = theme.palette.primary.main
    const primary200 = theme.palette.primary[200];
    const secondaryMain = theme.palette.secondary.main
    const secondaryLight = theme.palette.secondary.light

    const state = {
        series: data,
        height: 380,
        type: 'pie',
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: [t('going'), t('not going'), t('interested'), t('unanswered')],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: [primary, primary200, secondaryMain, secondaryLight]
        }
    }


    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type={state.type} height={state.height} />
        </div>
    )
}

export default NewUsersChart