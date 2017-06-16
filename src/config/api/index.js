import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import moment from 'moment'
import mockReplyResults from './mock-reply-results'

const mock = new MockAdapter(axios, { delayResponse: 1200 })


const filterResponseData = (data, period) => (
  data.filter(({ date }) => {
    const minDate = moment().subtract(1, period)
    const targetDate = moment(new Date(date))

    return targetDate.isAfter(minDate)
  })
)

mock.onGet('fakeapi').reply((config) => {
  const { params: { period } } = config;
  return [200, filterResponseData(mockReplyResults, period)]
});


const api = axios.create({
  baseURL: '/',
})

export default api

