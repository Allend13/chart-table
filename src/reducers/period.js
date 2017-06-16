import { PERIOD } from 'constants'

const initialState = 'month'

export default function period(state = initialState, action) {
  switch (action.type) {
    case PERIOD.SET_VALUE:
      return action.payload
    default:
      return state
  }
}
