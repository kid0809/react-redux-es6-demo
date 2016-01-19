import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import { syncHistory, routeReducer } from 'redux-simple-router'
import todos from './reducers/todos'
import { selectedReddit, postsByReddit } from './reducers/async'


import Home from './containers/Home'
import Todo from './containers/Todo'
import Async from './containers/Async'
import Foo from './components/Foo'


const reducer = combineReducers(Object.assign({}, { todos }, { selectedReddit }, { postsByReddit }, {
  routing: routeReducer
}))

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

const middleware = syncHistory(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(middleware, thunkMiddleware),
  DevTools.instrument()
)(createStore);


const store = finalCreateStore(reducer)
middleware.listenForReplays(store);

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={Home} >
          <Route path="foo" component={Foo}/>
        </Route>
        <Route path="/todo" component={Todo}/>
        <Route path="/async" component={Async}/>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app-mount')
)
