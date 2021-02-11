# 编译Tomcat遇到的问题

[相关视频](https://www.bilibili.com/video/BV1ST4y177Tx)

+ aQute.bnd.annotation.spi.ServiceConsumer找不到

    缺少了biz.aQute.bndlib包，将下面maven添加到根目录的pom.xml

    ```xml
    <dependency>
        <groupId>biz.aQute.bnd</groupId>
        <artifactId>biz.aQute.bndlib</artifactId>
        <version>5.2.0</version>
        <scope>provided</scope>
    </dependency>
    ```

+ 编译报错org.eclipse.jdt.internal.compiler.impl.CompilerOptions.VERSION_9

    当前安装JDK是8，可以直接注释掉这部分代码

+ JSP报初始化错误

    org.apache.catalina.startup.ContextConfig#configureStart方法中webConfig下一行添加`context.addServletContainerInitializer(new JasperInitializer(),null)`;

+ 日志输出乱码
    具体原因是properties资源文件编码用utf-8，读取用ascii码读取导致读取出来的值都是乱码，下面是需要修改的方法

    ```java
    org.apache.tomcat.util.res.StringManager#getString(java.lang.String)
    org.apache.jasper.compiler.Localizer#getMessage(java.lang.String)
    ```

    在从bundle读取到值后进行转码

    ```java
    if(errMsg!=null) {
        errMsg = new String(errMsg.getBytes(StandardCharsets.ISO_8859_1),StandardCharsets.UTF_8);
    }
    ```

## 启动脚本中一些参数

通过bin目录下脚本可以得到Tomcat的启动命令，一般来说执行startup.bat或者startup.sh就可以启动tomcat
但是为了在idea或者eclipse直接启动tomcat，我们还是要阅读启动脚本的逻辑
从startup.bat脚本可以得到主要运行的脚本是catalina.bat,在catalina.bat脚本中指定脚本参数可以修改tomcat的启动参数

|参数|备注|
|----|----|
|CATALINA_HOME|tomcat的运行目录，和根目录一致|
|CATALINA_BASE|根目录|
|CATALINA_OPTS|Tomcat的配置向，不指定在JAVA_OPTS中配置都指定在这里，比如gc，堆栈大小，JMX|
|CATALINA_TMPDIR|指定临时目录，默认是%CATALINA_BASE%/temp|
|JAVA_HOME|JDK的根目录|
|JRE_HOME|JRE的根目录|
|JAVA_OPTS|Java虚拟机的配置选项|
|JAVA_ENDORSED_DIRS|用分号分隔的目录，主要是目录的Jar中API可以替换原生的API|
|JPDA_TRANSPORT|默认值dt_socket，用于远程调试|
|JPDA_ADDRESS|localhost:8000,用于远程调试|
|JPDA_SUSPEND|默认值n，用于远程调试|
|JPDA_OPTS|用于远程调试，使用这个参数后JPDA_TRANSPORT，JPDA_ADDRESS，JPDA_SUSPEND被忽略|
|JSSE_OPTS|JSSE被使用后，指定JSSE的实现，默认Djdk.tls.ephemeralDHKeySize=2048|
|CATALINA_LOGGING_CONFIG|日志配置-Djava.util.logging.config.file=%CATALINA_BASE%\conf\logging.properties|
|LOGGING_CONFIG|作废|
|LOGGING_MANAGER|-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager|
|TITLE|tomcat窗口的标题|

+ Tomcat启动参数

    在tomcat目录新建CatalinaHome，运行时目录。将上级目录conf和webapps目录拷贝过来。

    运行类是org.apache.catalina.startup.Bootstrap
    VM参数：

    ```java
    -Dcatalina.base=G:\workspace\tomcat\CatalinaHome 
    -Dcatalina.home=G:\workspace\tomcat\CatalinaHome 
    -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Djava.util.logging.config.file=G:\workspace\tomcat\CatalinaHome\conf\logging.properties 
    -Dfile.encoding=UTF-8 
    -Dsun.jnu.encoding=UTF-8
    ```
