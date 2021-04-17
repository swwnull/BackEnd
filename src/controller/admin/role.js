const Base = require('../base.js');

module.exports = class extends Base {
    __before(){
        return this.checkAuth()
    }
    indexAction() {
        return this.json({msg:"admin page"})
    }

    async rolelistAction(){
        let page = this.get('page')?this.get('page'):1;
        let rolelist = await this.model('auth_role').order('id').page(page,10).select();
        let total = await this.model("auth_role").count()
        return this.json({rolelist,total})
    }

    async delroleAction(){
        let roleid = this.get('id');
        await this.model('auth_role').where({id:roleid}).delete()
        this.json({
            "msg":"删除成功"
        })
    }

    async addroleAction(){
    
        if(this.method=='POST'){
            let role = this.post();
            console.log(role)
            role.status =1;
            this.model('auth_role').add(role);
            this.json({msg:"权限添加成功"})
        }
    }

    async editroleAction(){
    
        if(this.method=='POST'){
            let role = this.post();
            console.log(role)
            role.status =1;
            this.model('auth_role').where({id:role.id}).update({desc:role.desc,rule_ids:role.rule_ids})
            this.json({msg:"权限添加成功"})
        }
    }


};
