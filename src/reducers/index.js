import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import period from './period'
import data from './data'

export default combineReducers({
  routing: routerReducer,
  period,
  data,
})
