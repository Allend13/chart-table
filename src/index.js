/* eslint-disable import/no-extraneous-dependencies, global-require */
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import 'less/master.less'
import Root from './components/root'
import configureStore from './store/configureStore'

const rootEl = document.getElementById('root')
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl,
)


if (module.hot) {
  module.hot.accept('./components/root', () => {
    const NextRoot = require('./components/root').default

    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      rootEl,
    )
  })
}
