import { createSelector } from 'reselect'

const getData = state => state.data.results

const sortByDate = (a, b) => {
  const timeA = new Date(a.date).getTime()
  const timeB = new Date(b.date).getTime()

  if (timeA > timeB) return 1
  if (timeA < timeB) return -1
  return 0
}

const getSortedDataset = createSelector(
  getData,
  data => data.sort(sortByDate),
)

const getComputedDataset = createSelector(
  getSortedDataset,
  data => data.map(({ date, value }) => ({
    x: date,
    y: value,
  })),
)

export default getComputedDataset
