import React from 'react'
import ReactApexChart from 'react-apexcharts';

const QuotasChart = ({ data }) => {
    const state = {
        series: data.series,
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10
                },
            },
            xaxis: {
                type: 'string',
                categories: data.categories
            },
            legend: {
              position: 'right',
              offsetY: 40
            },
            fill: {
              opacity: 1
            }
          }
    }


    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
        </div>
    )
}

export default QuotasChart