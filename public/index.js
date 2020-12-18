//加载express模块
const express = require("express");
//加载cors模块
const cors = require("cors");
//加载MD5模块
// const md5 = require("md5");
//加载body-parser模块
const bodyParser = require("body-parser");
//加载MySQL模块
const mysql = require("mysql");
const { log } = require("console");
//创建MySQL的连接池
const pool = mysql.createPool({
  //数据库服务器的地址
  host: "127.0.0.1",
  //数据库服务器的端口号
  port: 3306,
  //数据库用户的用户名
  user: "root",
  //数据库用户的密码
  password: "",
  //数据库名称
  database: "library",
  //编码方式
  charset: "utf8",
  //最大连接数
  connectionLimit: 20,
});
//创建web服务器实例
const server = express();

//加载Multer模块
const multer = require("multer");
//引入UUID模块
const uuid = require("uuid");

// 自定义存储规则
let storage = multer.diskStorage({
  //上传是目录的规则
  //req,代表的是当前的HTTP请求对象
  //file，代表是当前上传的文件对象
  //cb(callback),回调函数，让Multer按照指定的规则进行相关的操作
  destination: function(req, file, cb) {
    //cb(null,destination)
    //null代表错误对象
    //destination代表文件上传的目录
    cb(null, "upload");
  },
  // 上传文件名称的规则
  filename: function(req, file, cb) {
    //为上传的文件重新生成一个带有扩展名的文件名称
    //1. 生成一个主文件名称
    // let mainname=''+Date.now()+Math.ceil(Math.random()*99999);
    //  .v1产生基于时间戳的UUID  .v4产生基于随机数的UUID
    let mainname = uuid.v1();
    //file代表的当前上传的文件对象，它包含有以下属性
    //originalname,文件对象的原始名称，如1354654143.jpg
    //2. 获取文件原来的扩展名
    let extenstion = file.originalname
      .substr(file.originalname.lastIndexOf(".") + 1)
      .toLowerCase();
    //3. 将1和2拼接在一起形成新的文件名称
    let filename = mainname + "." + extenstion;
    //4.通过回调函数告诉Multer,让其按指定的规则进行命名
    cb(null, filename);
  },
});
// 使用存储规则
const upload = multer({
  storage: storage,
});

//将cors作为server的中间件
server.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
  })
);
//将body-parser作为server的中间件
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// 登录获取头像
server.post("/getAvatar", (req, res) => {
  let sql = "select avatar from s_user where username=?";
  pool.query(sql, [req.body.username], (error, results) => {
    if (error) throw error;
    // console.log(results[0].avatar);
    if (results.length > 0) {
      res.send({ code: "1", avatar: results[0].avatar });
    } else {
      res.send({ code: "0" });
    }
  });
});

// 修改头像
server.post("/avatar", upload.array("avatar"), (req, res) => {
  let file = req.files[0];
  let { username } = req.body;
  // console.log(file);
  sql = "update s_user set avatar=? where username=?";
  pool.query(sql, [file.filename, username], (error, results) => {
    if (error) throw error;
    res.send({ message: "修改成功", code: "1", avatar: file.filename });
  });
});

//修改订单数量
server.post("/updata", (req, res) => {
  let { title, orderNum } = req.body;
  orderNum = parseInt(orderNum);
  sql = "update s_order set orderNum=? where title=?";
  pool.query(sql, [orderNum, title], (error, results) => {
    if (error) throw error;
    res.send("1");
  });
});

// 删除订单
server.post("/del", (req, res) => {
  let { title, username } = req.body;
  sql = "DELETE FROM s_order WHERE title=? AND username=?";
  pool.query(sql, [title, username], (error, results) => {
    if (error) throw error;
    res.send("1");
  });
});
// 订单详情

server.post("/orderList", (req, res) => {
  let { username } = req.body;
  sql = "select * from s_order where username=?";
  pool.query(sql, [username], (error, results) => {
    if (error) throw error;
    res.send({ message: "用户订单", code: "1", results });
  });
});

// 用户订单
server.post("/order", (req, res) => {
  let obj = req.body;
  // console.log(obj);
  let sql = "select title from s_order where title=? AND username=?";
  pool.query(sql, [obj.title, obj.username], (error, results) => {
    if (error) throw error;
    // console.log(results);
    if (results.length > 0) {
      res.send({ message: "下单失败", code: "0" });
    } else {
      let sql = "insert into s_order set ?";
      pool.query(sql, [obj], (error, results) => {
        if (error) throw error;
        res.send({ message: "下单成功", code: "1" });
      });
    }
  });
});
//用户登录接口
server.post("/login", (req, res) => {
  let { uname, pass } = req.body;
  let sql = "select * from s_user where username=? and password=?";
  pool.query(sql, [uname, pass], (error, results) => {
    if (error) throw error;
    // console.log(uname, pass);
    // console.log(results);
    if (results.length > 0) {
      res.send({ message: "登录成功", code: 1, userInfo: results[0] });
    } else {
      res.send({ message: "登录失败", code: 0 });
    }
  });
});
//用户注册
server.post("/reg", (req, res) => {
  let obj = req.body;
  // console.log(req.body);
  //查找用户是否存在
  let sql = "SELECT * FROM s_user WHERE username=?";
  pool.query(sql, [obj.username], (error, results) => {
    if (error) throw error;
    // 如果用户不存才，则插入记录
    if (results[0]) {
      //否则产生和里的错误提示
      res.send({ message: "用户已经存在，注册失败", code: 0 });
    } else {
      // console.log('用户注册成功');
      sql = "INSERT INTO s_user set ?";
      pool.query(sql, [obj], (error, results) => {
        if (error) throw error;
        res.send({ message: "注册成功", code: 1 });
      });
    }
  });
});
//来指定web服务器监听的端口
server.listen(3000);
