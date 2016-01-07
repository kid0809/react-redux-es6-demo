'use strict'

import fs           from 'fs'
import express      from 'express'
import http         from 'http'
import path         from 'path'
import cm           from 'connect-multiparty'
import bodyParser   from 'body-parser'
import cookieParser from 'cookie-parser'
import favicon      from 'serve-favicon'
import morgan       from 'morgan'
import compression  from 'compression'
import serveStatic  from 'serve-static'
import errorhandler from 'errorhandler'
import exphbs       from 'express-handlebars'


module.exports = (app, env, config) => {
  // body parse
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(morgan('combined', {
    skip: function(req, res) {
      return res.statusCode < 400
    }
  }))
  app.use(cm())
  app.use(favicon(path.resolve(config.rootPath + '/favicon.ico')))
  app.use(express.static(path.resolve(__dirname, '../public')))

  // cookie parse
  app.use(cookieParser())

  // View engine - Handlebars
  app.engine(
    '.hbs', 
    exphbs({
      layoutsDir: 'web/public/views/layouts',
      partialsDir: 'web/public/views/partials',
      defaultLayout: 'main',
      extname: '.hbs'
    })
  )
  app.set('views', path.resolve(config.rootPath, 'web/public/views'))
  app.set('view engine', '.hbs')


  app.use(compression({
    threshhold: 512
  }, (req, res) => {
    return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
  }, {
    level: 9
  }))


  if (env === 'development') {
    // Hot load
    const wp_config = require('../../config/webdev.webpack.cfg')
    const compiler = require('webpack')(wp_config)
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: wp_config.output.publicPath
    }))
    app.use(require('webpack-hot-middleware')(compiler))

    // other
    app.locals.pretty = true
    app.use(errorhandler({
      dumpExceptions: true,
      showStack: true
    }))
  }

  if (env === 'production') {
    app.use(errorhandler())
  }

}
