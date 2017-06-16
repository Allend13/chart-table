import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import periods from 'config/periods'


const getLabels = dataset => dataset.map(value => value.x)

const getData = dataset => ({
  datasets: [{
    data: dataset,
    labels: getLabels(dataset),
    backgroundColor: 'transparent',
    borderColor: '#108ee9',
  }],
})

const getTimeAxisUnit = (period) => {
  const periodIndex = periods.indexOf(period)
  const quartIndex = periods.indexOf('quarter')

  if (periodIndex < quartIndex) return 'day'
  if (periodIndex >= quartIndex) return 'month'

  return 'day'
}

class LineChart extends PureComponent {

  componentDidMount() {
    const { ctx } = this
    this.renderChart(ctx)
  }

  shouldComponentUpdate(nextProps) {
    const { dataset } = this.props
    return dataset !== nextProps.dataset
  }

  componentDidUpdate() {
    const { chart, ctx } = this

    if (chart) {
      chart.destroy()
      this.renderChart(ctx)
    }
  }

  setCtx = (ctx) => {
    this.ctx = ctx
  }

  renderChart = (ctx) => {
    const { dataset, period } = this.props

    const options = {
      type: 'line',
      data: getData(dataset),
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: getTimeAxisUnit(period),
              unitStepSize: 1,
              displayFormats: {
                day: 'DD.MM',
                week: 'DD.MM',
                month: 'MM.YY',
                quarter: 'MM.YY',
                year: 'MM.YY',
              },
            },

          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 50,
            },
          }],
        },
        tooltips: {
          callbacks: {
            title: () => null,
          },
        },
      },
    }

    this.chart = new Chart(ctx, options)
  }

  render() {
    return <canvas ref={this.setCtx} height="100" />
  }
}

LineChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.number,
  })).isRequired,
  period: PropTypes.string.isRequired,
}

export default LineChart
