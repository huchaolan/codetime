# Nginx基础

## 编译Nginx

### 下载nginx

1. 打开nginx.org站点，下载源代码，现在Download页面
nginx分为Mainline和Stable两个版本。新的功能会在Mainline版本引入，Stable是稳定版本。

### nginx各个目录介绍

|目录|备注|
|----|----|
|auto|辅助conf脚本确定ngix支持的模块和为nginx提供当前系统特性|
|conf|配置脚本样例|
|contrib|辅助脚本，比如支持vim高亮配置脚本|
|html|静态页面,50x.html或者index.html|
|man|帮助|
|src|源代码目录|

### Configure的参数

查看编译脚本的帮助

```bash
./configure --help|more
```

分为3部分

1. --xxx=PATH,设置编译时的相关功能的目录，如果默认安装要指定--prefix=PATH目录
2. 使用和不使用哪些模块(with和without)，注意带with的模块默认不会编译进nginx，而without是默认编译进nginx中的
3. 在编译中需要设置的编译参数(--with-cpp=PATH)

### 编译

+ 编译前需要系统是否安装好gcc编译器还有nginx依赖的组件，比如zlib，openssl等等，执行下面自动安装

```bash
yum -y install gcc gcc-c++ autoconf automake
yum -y install zlib zlib-devel openssl openssl-devel pcre-devel
```

+ 执行configure脚本

```bash
./configure --prefix=/home/wtadmin/nginx-1.16.0 --conf-path=/data01/nginx/conf/nginx.conf
```

没有--conf-path参数会报"conf/koi-win" 与"/usr/local/nginx/conf/koi-win" 为同一文件
没有提示报错就标识编译成功，ngnix运行时目录由脚本输出

```bash
nginx binary file: "/home/wtadmin/nginx-1.16.0/sbin/nginx"
nginx modules path: "/home/wtadmin/nginx-1.16.0/modules"
nginx configuration prefix: "/home/wtadmin/nginx-1.16.0/conf"
nginx configuration file: "/home/wtadmin/nginx-1.16.0/conf/nginx.conf"
nginx pid file: "/home/wtadmin/nginx-1.16.0/logs/nginx.pid"
nginx error log file: "/home/wtadmin/nginx-1.16.0/logs/error.log"
nginx http access log file: "/home/wtadmin/nginx-1.16.0/logs/access.log"
nginx http client request body temporary files: "client_body_temp"
nginx http proxy temporary files: "proxy_temp"
nginx http fastcgi temporary files: "fastcgi_temp"
nginx http uwsgi temporary files: "uwsgi_temp"
nginx http scgi temporary files: "scgi_temp"
```

+ 执行make编译
编译完成后执行make命令，没有任务错误就会生成大量的中间文件和运行时文件

+ 执行make install
make install将编译二进制文件和配置文件复制到编译的指定目录中，上配置脚本命令我们指定了--conf-path参数，所以编译好的配置文件会根据这个参数复制对应的目录中

### 中间文件介绍

编译生成的文件会放到objs目录中，其中ngx_modules.c文件是编译引进的模块。


## nginx配置文件的通用语法

### nginx配置语法

+ 配置文件由指令与指令块构成
+ 每条指令以;分号结尾，指令与参数间以空格分隔
+ 指令块以{} 大括号将多条指令组织在一起
+ include语句允许组合多个配置文件以提升可维护性
+ 使用#符号添加注释
+ 使用$符号使用变量
+ 部分指令的参数支持正则

### 时间相关

|单位|说明|
|----|----|
|ms|milliseconds|
|s|seconds|
|m|minutes|
|h|hours|
|d|days|
|w|weeks|
|M|months,30days|
|y|years,365days|

### 空间单位

|单位|说明|
|----|----|
|没有指定单位|bytes|
|k/K|kilobytes|
|m/M|megabytes|
|g/G|gigabytes|

### 配置的指令块

http,server,location,upstream

upstream是nginx需要与上游服务器(tomcat)交互时指定
server是指定服务器地址可以域名或者ip地址
location指定一个url

## nginx简单命令行

01. 格式：nginx -s reload
02. 帮助: -? -h
03. 使用指定的配置文件:-c
04. 指定配置指令:-g
05. 指定运行目录:-p 指定了默认的conf路径会被覆盖掉
06. 发送信号:-s，参数:stop,quit,reload,reopen
07. 测试配置文件是否由语法错误:-t -T
08. 打印nginx的版本信息，编译信息等:-v -V

+ 重载配置文件`./nginx -s reload`
+ 热部署

1. 先备份sbin目录下nginx文件
2. 将新版本的nginx拷贝的这个目录
3. 执行`kill -USR2 PID`后系统会启动新的nginx进程，并将流量过度到新的进程中
4. 执行`kill -WINCH PID`会将老的work进程推出，但是老的master进程不会退出，考虑到回退版本

+ 切割配置文件

## 用nginx搭建静态资源Web服务器

+ 配置特定目录

在location指令块中插入alias指令，就可以访问了

```bash
location / {
    alias html/tomcatdocs/;
}
```

这里由两个问题：1.文件权限的问题2.启动用户的问题,它们会导致nginx返回403
文件权限的问题是由于启动用户没有权限读取tomcatdocs目录下的问题
启动用户的问题，在配置文件中注释了`user nobody`,要改成`user root`那么启动进程就是使用root账号

+ 开启gzip压缩

```bash
gzip  on;
gzip_min_length 1;
gzip_comp_level 2;
gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-http-php;
```

gzip_min_length 小于指定大小的不压缩
gzip_comp_level 压缩级别
gzip_types 指定contentType才进行压缩

+ 限制流量

`set $limit_rate 1k;` 代表每秒传输1k字节到浏览器中。

## 用nginx搭建反向代理

如果在listen指令后面加上ip地址，那么nginx只会监听这个ip地址上的请求，其他ip地址是拒绝的

最简单的反向代理

```bash
upstream test11 {
    server 127.0.0.1:8080;
}

location / {
    proxy_pass http://test11;
}
```

用upstream定义了一个上游的ip地址和端口，注意反向代理的端口号可以不和上游端口保持一致。
浏览器访问时用反向代理的ip地址和和端口号就可以访问
用proxy_pass告诉nginx，location包括的所有流量都会转发到test11定义上游服务器中
