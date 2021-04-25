import { Chart } from "chart.js";
import react from "react"

class WeatherLineChart extends react.Component {
    constructor(props) {
        super(props);
        this.canvasRef = react.createRef()
    }

    componentDidMount() {
        this.lineChart = new Chart(this.canvasRef.current, this._buildChartConfig())
    }

    _buildChartConfig () {
        return { 
            type: 'line',
            data: {
                datasets: [{
                    label: 'Temperature',
                    data: this._buildChartData(),
                    fill: 'start',
                    backgroundColor: '#1e82dd',
                    pointRadius: 3,
                    borderColor: '#a8cef0',
                    borderWidth: 2,
                    lineTension: 0
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

    _buildChartData() {
        return [
            this.props.TempData.TempBefore,  
            this.props.TempData.TempCurrent, 
            this.props.TempData.TempAfter
        ];
    }
    
    render() {
        return (
            <canvas ref={this.canvasRef}></canvas>
        )
    }
}

export default WeatherLineChart