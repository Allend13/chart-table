import { createStore, applyMiddleware, compose } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const router = routerMiddleware(browserHistory)
const logger = createLogger({ timestamp: false });

const enhancer = compose(
  applyMiddleware(thunk, router, logger),
)

export default function configureStore() {
  const store = createStore(reducers, enhancer)

  if (module.hot) {
    module.hot.accept('reducers', () => store.replaceReducer(reducers))
  }

  return store
}
