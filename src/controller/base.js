const jsonwebtoken = require('jsonwebtoken');
module.exports = class extends think.Controller {
  __before() {

  }

  // session -> cookie
  //JWT 跨域身份验证方案，JSON WEB TOKEN
  //1用户发送用户名和密码
  //2验证用户名和密码，保存验证信息
  //3返回口令给到前端
  //4前端将口令保存起来
  //5下次发送请求的时候，将口令再发给服务器
  //6服务器可以验证口令，判断用户的信息和登陆状态
  //7更新口令
  authFail(){
    this.json({error:"JWT校验失败"});
    return false;
  }

  //检验token
  checkAuth(){
    let token = this.ctx.headers['x-token'];//获取context的header所有内容
    const {secret,cookie,exipre} = this.config('jwt')

    try {
      var tokenObj = token? jsonwebtoken.verify(token,secret):{};
      console.log(tokenObj);
      this.ctx.state.username = tokenObj.name;
    } catch (error) {
      return this.authFail()
    }

    if(!tokenObj.name){
      return this.authFail()
    }

    this.updateAuth(token.name)
  }

  //更新token
  updateAuth(userName){
    const userInfo = {
      name:userName
    };
    // 获取jwt的配置信息
    const {secret,cookie,expire} = this.config('jwt')
    const token = jsonwebtoken.sign(userInfo,secret,{expiresIn:expire});//签署expire小时期限的token:
    this.cookie(cookie,token);
    this.header('authoriztion',token);
    return token;
  }

};
