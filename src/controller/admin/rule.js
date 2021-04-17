const Base = require('../base.js');

module.exports = class extends Base {
    __before(){
        return this.checkAuth()
    }
    indexAction() {
        return this.json({msg:"admin page"})
    }

    async rulelistAction(){
        let page = this.get('page')?this.get('page'):1;
        let rulelist = await this.model('auth_rule').order('id').page(page,10).select();
        let total = await this.model("auth_rule").count()
        return this.json({rulelist,total})
    }

    async delruleAction(){
        let ruleid = this.get('id');
        await this.model('auth_rule').where({id:ruleid}).delete()
        this.json({
            "msg":"删除成功"
        })
    }

    async addruleAction(){
    
        if(this.method=='POST'){
            let rule = this.post();
            console.log(rule)
            rule.status = rule.status?"1":"-1";
            this.model('auth_rule').add(rule);
            
            this.json({msg:"权限添加成功"})
        }
    }

    async editruleAction(){
        if(this.method=='POST'){
            let rule = this.post();
            rule.status = rule.status?"1":"-1";
            await this.model('auth_rule').where({id:rule.id}).update({name:rule.name,desc:rule.desc,status:rule.status})
            this.json({msg:"权限更新成功"})
        }
    }
};
