'use strict'

import React from 'react'
import ReactDOMServer from 'react-dom/server'

const DOM = React.DOM, div = DOM.div, script = DOM.script


module.exports = (express, app, env) => {

  const router = express.Router()

  const vendorScript = '<script src="/bundle/vendor.js" defer="true"></script>'
  const cssScript = '<script src="/bundle/css.js" defer="true"></script>'
  const appScript = '<script src="/bundle/components.js" defer="true"></script>'

  let insertScript = vendorScript + cssScript + appScript


  // 每一条路由都要先执行该 middleware(中间件) 一遍
  router.use((req, res, next) => {
    next()
  })


  router.get('/', (req, res) => {
    res.render('index', { title: 'Home page', insertScript: insertScript })
  })


  // Route not found - set 404
  router.get('*', (req, res) => {
    res.json({
      'route': 'Sorry! This page does not exist!'
    })
  })


  app.use('/', router)

  // 用户登录中间件校验样例
  // const userRouter = express.Router()
  // app.use('/user', userRouter)
  // userRouter.user(isLogin)
  // userRouter.route('/')
  //   .get((req, res) => {})
  //   .put((req, res) => {})
  //   .post((req, res) => {})
  //   .delete((req, res) => {})
}
