'use strict'

import path from 'path'
import http from 'http'
import express from 'express'
import config from '../config/config'

const app = module.exports = express()

const env = process.env.NODE_ENV || 'development'
const webport = process.env.PORT || config.webport || 3000
app.set('env', env)
app.set('port', webport)

require('./server/express')(app, env, config)

require('./server/web-routes')(express, app, env)

http.createServer(app).listen(webport, (err) => {
  console.info(`==> 🌐  ${config.name} Server started on port ${webport}, env=${env}`)
})