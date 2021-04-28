import react from "react"
import { Chart, Filler, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js"

class WeatherLineChart extends react.Component {
    constructor(props) {
        super(props);
        this.canvasRef = react.createRef()
    }

    componentDidMount() {
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler)
        this.lineChart = new Chart(this.canvasRef.current, this._buildChartConfig())
    }

    _buildChartConfig() {
        return { 
            type: 'line',
            data: {
                labels: ["Minimum", "Current", "Maximum"],
                datasets: [{
                    label: 'Temperature',
                    fill: 'start',
                    data: Object.values(this.props),
                    borderColor: '#1e82dd',
                    backgroundColor: '#c2e7f0',
                    pointRadius: 5,
                    borderWidth: 2,
                    lineTension: 0.4
                }]
            },
            options: {
                plugins: {
                    filler: {
                        propagate: false
                    },
                    title: {
                        display: true,
                        text: 'Temperature'
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
            <div className='col-lg-8'>
                <canvas ref={this.canvasRef}></canvas>
            </div>
        )
    }
}

export default WeatherLineChart