/**************************************
 * Created by Kid on 2015年9月5日
 **************************************/
'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from './routes'

render(
	<Router history={ createBrowserHistory() } routes={ routes }/>,
  document.getElementById('app-mount')
)
