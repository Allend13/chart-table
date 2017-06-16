import { PERIOD } from 'constants'

export default function setPeriod(period) {
  return ({
    type: PERIOD.SET_VALUE,
    payload: period,
  })
}
