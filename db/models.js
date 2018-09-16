//包含n个操作数据库集合数据的Model模块
//1.连接数据库
//1.1引入mongoose
const mongoose = require('mongoose');
//1.2连接指定数据库
mongoose.connect('mongodb://localhost:27017/gzhipin');
//1.3获取连接对象
const conn = mongoose.connection;
//1.4监听
conn.on('connected', function() {//连接成功自动调用
    console.log('数据库连接成功');
});

//2.得到对应特定集合的Model并向外暴露
//2.1定义Schema(描述文档结构)
const userSchema = mongoose.Schema({//传一个指定文档结构的对象:属性名/类型/是否必须/默认值
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    header: {type: String},
    post: {type: String},//职位
    info: {type: String},
    company: {type: String},
    salary: {type: String}
});
//2.2定义Model（与集合对应，可以操作集合）
const UserModel = mongoose.model('user', userSchema);//集合名称为：users
//2.3向外暴露Model
exports.UserModel = UserModel;
