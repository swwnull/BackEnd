const Base = require('../base.js');

module.exports = class extends Base {
  indexAction() {
    return this.json({msg:"login page"})
  }

  async loginAction(){
      if(this.method=="POST"){
        //   获取post提交用户名和密码
          let username = this.post('username')
          let password = this.post('password')
        // 查寻数据库member表,根据用户名查询用户信息
        let user = await this.model('member').where({username:username}).find()
        //判断提交的密码是否与查询到的密码一致
        if(user.password == this.verifyPassword(password)){
            //完成登陆-更新token
            const token = this.updateAuth(username);
            this.json({state:'登陆成功',token:token})
        }else{
            return this.json({state:"登陆失败"})
        }
        
      }
  }
  verifyPassword(password){
    return think.md5(think.md5('www.cmswing.com')+think.md5(password)+think.md5('Arterli'))
  }
};
