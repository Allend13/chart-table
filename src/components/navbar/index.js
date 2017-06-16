import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Radio } from 'antd'
import setPeriodAction from 'actions/period'
import periods from 'config/periods'
import styles from './styles.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const toSentenceCase = word => `${word[0].toUpperCase()}${word.substr(1, word.length - 1)}`

const renderRadioOptions = () => (
  periods.map(option => (
    <RadioButton key={option} value={option}>{toSentenceCase(option)}</RadioButton>
  ))
)

const Navbar = (props) => {
  const { period, setPeriod } = props

  const handleChange = (evt) => {
    const { value } = evt.target
    setPeriod(value)
  }

  return (
    <div className={styles.root}>
      <RadioGroup
        value={period}
        onChange={handleChange}
        size="large"
      >
        {renderRadioOptions()}
      </RadioGroup>
    </div>
  )
}

Navbar.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    period: state.period,
  }), {
    setPeriod: setPeriodAction,
  },
)(Navbar)
