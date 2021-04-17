const path = require('path');
const isDev = think.env === 'development';
const jwt = require('koa-jwt');

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  {
    handle:jwt,
    options:{
      cookie:think.config('jwt')['cookie'],
      sercet:think.config('jwt')['secret'],
      passthrough:true   //这个参数让我们不管权限验证通过与否都可以继续执行后面的中间件
    }
  },
  'logic',
  'controller'
];
