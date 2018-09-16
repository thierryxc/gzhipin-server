//测试使用mongoose测试数据库
//1.连接数据库
//1.1引入mongoose
const mongoose = require('mongoose');
const md5 = require('blueimp-md5');//加密函数
//1.2连接指定数据库
mongoose.connect('mongodb://localhost:27017/gzhipin_test');
//1.3获取连接对象
const conn = mongoose.connection;
//1.4监听
conn.on('connected', function() {//连接成功自动调用
    console.log('数据库连接成功');
});

//2.得到对应特定集合的Model
//2.1定义Schema(描述文档结构)
const userSchema = mongoose.Schema({//传一个指定文档结构的对象:属性名/类型/是否必须/默认值
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    header: {type: String}
});
//2.2定义Model（与集合对应，可以操作集合）
const UserModel = mongoose.model('user', userSchema);//集合名称为：users

//3.通过Model及其实例对集合进行CURD
//3.1通过Model实例的save（）添加数据
function tsetSave() {
    //创建UserModel实例
    const userModel = new UserModel({username: 'xuquheng', password: md5('345'), type: 'laoban'});
    userModel.save(function(error, doc) {
        console.log('save()', error, doc);   
    });
}
//tsetSave();
//3.2通过Model的find()或finfOne()查询一个或多个数据
function testFind() {
    //查询多个
    UserModel.find(function (error, docs) {//得到数组或[]
        console.log('find()', error, docs);
    });
    //查询一个
    UserModel.findOne({username: 'xuchen'}, function (error, doc) {//得到对象或null
        console.log('finfOne()', error, doc);
    });
}
//testFind();
//3.3通过Model的findByIdAndUpdate()更新数据
function testUpdate () {
    UserModel.findByIdAndUpdate({_id: '5b8f56c21ad8183d6c7d928f'}, {username: 'xuchen'}, function (error, doc) {//返回老的
        console.log('finfByIdAndUpdate()', error, doc);
    });
}
//testUpdate();
//通过Model函数的remove()方法删除匹配数据
function testDelete () {
    UserModel.remove({_id: '5b8f56c21ad8183d6c7d928f'}, function (error, doc) {//返回n（删除数量）和ok（0失败，1成功）
        console.log('testDelete', error, doc);
    });
}
testDelete();
