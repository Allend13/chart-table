/* eslint-disable react/forbid-prop-types */
import React, { PropTypes } from 'react'
import { Router, Route, Redirect } from 'react-router'
import { App } from 'components'

const Routes = props => (
  <Router history={props.history}>
    <Route path="/" component={App} />
    <Redirect from="*" to="/" />
  </Router>
)

Routes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Routes
