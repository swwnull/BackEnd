const Base = require('../base.js');
let path = require('path')
let fs = require('fs')

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  upImgsAction(){
    let uploadfile = this.file('uploadFile');
    let filepath = uploadfile.path;
    let uploadpath = think.ROOT_PATH + '/www/static/upload';
    think.mkdir(uploadpath);

    let basename = path.basename(filepath);
    var readStream=fs.createReadStream(filepath);
    var writeStream=fs.createWriteStream(uploadpath + '/' + basename);
    readStream.pipe(writeStream);
    this.success({filename:basename,originName:uploadfile.name});
  }
};
