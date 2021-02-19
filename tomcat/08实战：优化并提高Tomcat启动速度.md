# 实战：优化并提高Tomcat启动速度

## 清理你的Tomcat

+ 清理不必要的Web应用
删除掉 webapps 文件夹下不需要的工程，一般是 host-manager、example、doc 等这些默认的工程
+ 清理XML配置文件
Tomcat 在启动的时候会解析所有的XML配置文件，但XML解析的代价可不小，因此我们要尽量保持配置文件的简洁，需要解析的东西越少，速度自然就会越快
+ 清理 JAR 文件
JVM 的类加载器在加载类时，需要查找每一个JAR文件，去找到所需要的类。如果删除了不需要的 JAR 文件，查找的速度就会快一些。这里请注意：Web应用中的lib目录下不应该出现ServletAPI 或者Tomcat自身的JAR，这些JAR由Tomcat负责提供。如果你是使用Maven来构建你的应用，对 Servlet API 的依赖应该指定为provided
+ 清理其他文件
删除logs文件夹下不需要的日志文件。同样还有work文件夹下的catalina文件夹，它其实是 Tomcat把JSP转换为Class文件的工作目录。有时候我们也许会遇到修改了代码，重启了Tomcat，但是仍没效果，这时候便可以删除掉这个文件夹，Tomcat下次启动的时候会重新生成

## 禁止TomcatTLD扫描

为了支持JSP，在应用启动的时候会扫描JAR包里面的 TLD 文件，加载里面定义的标签库，所以在 Tomcat 的启动日志里.

+ 项目中不使用JSP
项目没有使用JSP作为Web页面模板，而是使用Velocity之类的模板引擎，你完全可以把TLD扫描禁止掉
Tomcat的conf/目录下的context.xml文件，在这个文件里 Context 标签下，加上JarScanner和JarScanFilter子标签

    ```xml
    <Context>
        <JarScanner>
            <JarScanFilter defaultTldScan="false"/>
        </JarScanner>
    </Context>
    ```

+ 项目中使用JSP
项目使用了JSP 作为 Web 页面模块，意味着 TLD 扫描无法避免，可以通过配置来告诉Tomcat，只扫描那些包含TLD文件的JAR包。找到 Tomcat 的conf/目录下的catalina.properties文件，在这个文件里的jarsToSkip配置项中，加上你的JAR包

    ```properties
    tomcat.util.scan.StandardJarScanFilter.jarsToSkip=xxx.jar
    ```

## 关闭WebSocket支持

Tomcat会扫描WebSocket注解的API实现，比如@ServerEndpoint注解的类。conf/目录下的context.xml文件，给 Context 标签加一个containerSciFilter的属性

```xml
<Context containerSciFilter="org.apache.websocket.server.WsSci">
    ...
</Context>
```

还可以把Tomcat lib目录下的websocket-api.jar和tomcat-websocket.jar这两个JAR文件删除掉

## 关闭JSP支持

```xml
<Context containerSciFilter="org.apache.jasper.servlet.JasperInitializer">
    ...
</Context>
```

如果同时要关闭WebSocket和JSP，containerSciFilter属性用|分隔

## 禁止Servlet注解扫描

Servlet 3.0 引入了注解 Servlet，Tomcat会在Web应用启动时扫描你的类文件，因此如果你没有使用Servlet注解这个功能，可以告诉Tomcat不要去扫描Servlet注解
在Web应用的web.xml文件中，设置元素的属性metadata-complete="true"

## 配置Web-Fragment扫描

Servlet 3.0 还引入了“Web 模块部署描述符片段”的web-fragment.xml。这个web-fragment.xml文件必须存放在JAR文件的META-INF目录下，而 JAR包通常放在WEB-INF/lib目录下，因此Tomcat需要对JAR文件进行扫描才能支持这个功能

配置web.xml里面的元素直接指定了哪些 JAR 包需要扫描web fragment，如果元素是空的， 则表示不需要扫描

```xml
<web-app>
    <absolute-ordering/>
</web-app>
```

## 随机数熵源优化

Tomcat7以上的版本依赖Java的SecureRandom类来生成随机数。JVM 默认使用阻塞式熵源（/dev/random），在某些情况下就会导致 Tomcat 启动变慢。

> org.apache.catalina.util.SessionIdGenerator createSecureRandomINFO: Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [8152] milliseconds.

+ JVM使用非阻塞式的熵源
 `-Djava.security.egd=file:/dev/./urandom`

+ 设置java.security文件，
位于$JAVA_HOME/jre/lib/security目录之下： securerandom.source=file:/dev/./urandom

/dev/./urandom中间有个./的原因是Oracle JRE中的 Bug，Java 8里面的SecureRandom类已经修正这个Bug。 阻塞式的熵源（/dev/random）安全性较高， 非阻塞式的熵源（/dev/./urandom）安全性会低一些，因为如果你对随机数的要求比较高， 可以考虑使用硬件方式生成熵源。

## 并行启动多个Web应用

默认情况下Web应用都是一个一个启动的，等所有Web应用全部启动完成。
可以通过修改server.xml中Host元素startStopThreads属性来完成。startStopThreads的值表示你想用多少个线程来启动你的Web应用。如果设成0表示你要并行启动Web应用

```xml
<Engine startStopThreads=0>
    <Host startStopThreads=0>
    </Host>
</Engine>
```



