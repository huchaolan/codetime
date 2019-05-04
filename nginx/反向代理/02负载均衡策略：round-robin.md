# 02负载均衡策略：round-robin

## 指定上游服务地址的upstream与server指令

+ upstream介绍

语法:upstream name {...}
上下文:http

1. upstream只能出现在http上下文中，
2. name是由后面的反向代理模块使用，
3. {...}内容由server指令指定

+ server地址

语法：server 地址 [parameters]
上下文:upstream

1. 每一个server代表服务器
2. 地址表示服务器地址，可以是域名，IP地址后住socket地址，可以加端口，没有端口默认80
3. parameters是控制负债均衡的行为。backup指定server是备份服务，仅当非备份server不可用，请求才会转发到该server中。down标识某台服务已经下线

## 加权Round-Robin负债均衡算法

加权轮询的方式访问server指令指定的上游服务。集成在Nginx的upstream框架中

