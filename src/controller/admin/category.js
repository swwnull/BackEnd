const Base = require('../base.js');

module.exports = class extends Base {
    __before(){
        return this.checkAuth()
    }
    indexAction() {
        return this.json({msg:"admin page"})
    }

    async categorylistAction(){
        let page = this.get('page')?this.get('page'):1;
        let categorylist = await this.model('category').order('id').page(page,10).select();
        let total = await this.model("category").count()
        return this.json({categorylist,total})
    }

    async delcategoryAction(){
        let categoryid = this.get('id');
        await this.model('category').where({id:categoryid}).delete()
        this.json({
            "msg":"删除成功"
        })
    }

    async addcategoryAction(){
    
        if(this.method=='POST'){
            let category = this.post();
            console.log(category)
            category.status =1;
            category.name = category.title;
            this.model('category').add(category);
            this.json({msg:"权限添加成功"})
        }
    }

    async editcategoryAction(){
    
        if(this.method=='POST'){
            let category = this.post();
            console.log(category)
            category.status =1;
            this.model('category').where({id:category.id}).update({name:category.title,title:category.title})
            this.json({msg:"权限添加成功"})
        }
    }


};
