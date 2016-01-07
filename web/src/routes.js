'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Todo from './todo/Todo'

export default (
  <Route path="/" component={ Todo } >
    <IndexRoute component={ Todo } />
  </Route>
)
