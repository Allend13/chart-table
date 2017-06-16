import { DATA } from 'constants'

const initialState = {
  results: [],
  isFetching: false,
  timestamp: new Date().getTime(),
}

export default function navbar(state = initialState, action) {
  switch (action.type) {
    case DATA.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case DATA.GET_SUCCESS:
      return {
        results: action.payload,
        isFetching: false,
      }
    case DATA.GET_ERROR:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
