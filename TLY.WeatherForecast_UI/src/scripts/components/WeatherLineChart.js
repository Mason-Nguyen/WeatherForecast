import React, {useRef, useState, useEffect} from "react"
import { Chart, Filler, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js"

import '../../scss/WeatherLineChart.scss'

const WeatherLineChart = ({minTemp, currentTemp, maxTemp}) => {
    const canvasRef = useRef(null)
    const [lineChart, setChart] = useState(null)

    useEffect(() => {
        _renderChart()

        return (() => _destroyChart())
    }, [])

    useEffect(() => {
        if (!lineChart) {
            return
        }

        _updateChart()
    }, [minTemp, currentTemp, maxTemp])

    const _destroyChart = () => {
        if (chart) chart.destroy();
      };

    const _renderChart= () => {
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler) // Must register before create new Chart
        const lineChart = new Chart(canvasRef.current, _buildChartConfig())
        setChart(lineChart)
    }

    const _updateChart = () => {
        lineChart.data.datasets[0].data = _buildChartData()
        lineChart.update()
    }

    const _buildChartData = () => [minTemp, currentTemp, maxTemp]

    const _buildChartConfig = () => {
        return {
            type: 'line',
            data: {
                labels: ["Minimum", "Current", "Maximum"],
                datasets: [{
                    label: 'Temperature',
                    fill: 'start',
                    data: _buildChartData(),
                    borderColor: '#1e82dd',
                    backgroundColor: '#c2e7f0',
                    pointRadius: 5,
                    borderWidth: 2,
                    lineTension: 0.4
                }]
            },
            options: {
                animation: {
                    duration: 3000 // Set animation play time
                },
                responsive:true, // chart is responsive
                aspectRatio: 3, // (width/height)
                plugins: {
                    filler: {
                        propagate: false
                    },
                    title: { // Display chart title
                        display: true,
                        text: ''
                    }
                },
                interaction: {
                    intersect: false,
                }
            }
        }
    }

    return <canvas id='chart' ref={canvasRef}></canvas>
}

export default WeatherLineChart