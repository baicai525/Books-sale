#设置客户端连接服务器端的编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS library;
#创建新的数据库，设置存储的编码
CREATE DATABASE library CHARSET=UTF8;
#进入该数据库
USE library;


#用户注册表
CREATE TABLE s_user(
  userId int PRIMARY KEY AUTO_INCREMENT,
  username varchar(48) UNIQUE NOT NULL,
  password varchar(48) DEFAULT NULL,
  avatar varchar(128) DEFAULT NULL,
  sex varchar(2) DEFAULT NULL,
  age int(5) DEFAULT NULL,
  phone char(11) DEFAULT NULL,
  address varchar(128) DEFAULT NULL
);

INSERT INTO s_user VALUES
	(1,"dingding",123456789,null,1,15,15123456789,"河南省洛阳市洛宁县");
INSERT INTO s_user VALUES
	(2,"dangdang",123456789,null,3,45,15123456789,"河南省郑州市金水区");

#用户订单
CREATE TABLE s_order(
  orderId int PRIMARY KEY AUTO_INCREMENT,
  username varchar(48) NOT NULL,
  title varchar(48) NOT NULL,
  subTitle varchar(128) NOT NULL,
  img varchar(128) DEFAULT NULl,
  price decimal(6,2) NOT NULL,
  orderNum varchar(48) DEFAULT '1'
)












