import React from 'react'
import ReactApexChart from 'react-apexcharts';

const SportsChart = ({ data }) => {
    const state = {
        series: data.series,
        options: {
            chart: {
              type: 'donut',
            },
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
            }]
          }
    }


    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="donut" height={350} />
        </div>
    )
}

export default SportsChart