import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'
import todos from './reducers/todos'

import Home from './components/Home'
import Todo from './containers/App'
import Foo from './components/Foo'


const reducer = combineReducers(Object.assign({}, { todos }, {
  routing: routeReducer
}))

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

const middleware = syncHistory(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(middleware),
  DevTools.instrument()
)(createStore);


const store = finalCreateStore(reducer)


render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={Home} >
          <Route path="todo" component={Todo}/>
          <Route path="foo" component={Foo}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app-mount')
)
