import react from "react"
import { Chart, Filler, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js"

import '../../scss/WeatherLineChart.scss'

class WeatherLineChart extends react.Component {
    constructor(props) {
        super(props);
        this.canvasRef = react.createRef()
    }

    componentDidMount() {
        this._renderChart()
    }

    componentDidUpdate() {
        this._updateChart()
    }

    _renderChart() {
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler) // Must register before create new Chart
        this.lineChart = new Chart(this.canvasRef.current, this._buildChartConfig())
    }

    _updateChart() {
        this.lineChart.data.datasets[0].data = this._buildChartData()
        this.lineChart.update()
    }

    _buildChartData() {
        return Object.values(this.props)
    }

    _buildChartConfig() {
        return {
            type: 'line',
            data: {
                labels: ["Minimum", "Current", "Maximum"],
                datasets: [{
                    label: 'Temperature',
                    fill: 'start',
                    data: this._buildChartData(),
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

    render() {
        return (
            <canvas id='chart' ref={this.canvasRef}></canvas>
        )
    }
}

export default WeatherLineChart