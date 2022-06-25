import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

const SportsChart = ({ data }) => {
  const theme = useTheme();
  const { t } = useTranslation()

  const primary = theme.palette.primary.main
  const primary200 = theme.palette.primary[200];
  const secondaryMain = theme.palette.secondary.main

    const state = {
        series: data,
        options: {
            chart: {
              type: 'donut',
            },
            labels: [t('male_for_donut'), t('female_for_donut'), t('other_for_donut')],
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
            colors: [primary, primary200, secondaryMain]
        }
    }


    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="donut" height={350} />
        </div>
    )
}

export default SportsChart