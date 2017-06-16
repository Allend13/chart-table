import { DATA } from 'constants'
import api from 'config/api'

export default function getData(period) {
  return (dispatch) => {
    dispatch({ type: DATA.GET_REQUEST })

    api.get('/fakeapi', { params: { period } })
      .then((res) => {
        dispatch({
          type: DATA.GET_SUCCESS,
          payload: res.data,
        })
      })
      .catch(() => {
        dispatch({ type: DATA.GET_ERROR })
      })
  }
}
