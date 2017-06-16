import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { Navbar, Chart } from 'components'
import getPeriodAction from 'actions/data'
import getComputedDataset from './selectors'
import styles from './styles.less'

const { root, chart, spinner, spinnerWrapper } = styles

class App extends PureComponent {

  componentDidMount() {
    const { period, getData } = this.props
    getData(period)
  }

  componentWillReceiveProps(nextProps) {
    const { period, getData } = this.props
    const nextPeriod = nextProps.period

    if (period !== nextPeriod) getData(nextPeriod)
  }

  renderChart = () => {
    const { dataset, period } = this.props

    if (dataset.length) {
      return (
        <Chart dataset={dataset} period={period} />
      )
    }

    return null
  }

  render() {
    const { isFetching } = this.props

    return (
      <div>
        <div className={root}>
          <Navbar />
          <div className={chart}>
            <Spin wrapperClassName={spinnerWrapper} className={spinner} spinning={isFetching}>
              {this.renderChart()}
            </Spin>
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.number,
  })).isRequired,
  period: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isFetching: state.data.isFetching,
    dataset: getComputedDataset(state),
    period: state.period,
  }), {
    getData: getPeriodAction,
  },
)(App)
