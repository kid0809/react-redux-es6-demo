'use strict'

import path from 'path'

export default {
  name: 'iDurianMedia Universal Scaffold',

  webport: 9000,
  apiport: 9001,

  rootPath: path.normalize(path.resolve(__dirname, '../')),

  secret: 'ice and fire'

  // db_type: 'mysql',
  // db_host: '107.170.235.221',
  // db_username: '',
  // db_password: '',

  // db_database: '',
  // db_port: 3306,
  // db_charset: 'utf8',
  // db_maxConnection: 50,
  // db_maxIdleTime: 30
}