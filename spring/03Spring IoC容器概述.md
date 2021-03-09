# Spring IoC容器概述

## IoC依赖查找

依赖注入还不够吗?依赖查找存在的价值几何？

+ 根据Bean名称查找
  + 实时查找(直接通过getBean的API获取对应的Bean)
`User user = beanFactory.getBean("user", User.class);`
  + 延迟查找(通过ObjectFactory代理来获取)

    ```xml
    <bean id="objectFactory" class="org.springframework.beans.factory.config.ObjectFactoryCreatingFactoryBean">
        <property name="targetBeanName" value="user" />
    </bean>
    ```

    ```java
    ObjectFactory<User> objectFactory = (ObjectFactory<User>)beanFactory.getBean("objectFactory");
    User user = objectFactory.getObject();
    ```

+ 根据Bean类型查找
  + 单个Bean对象
  通过Class类型获取相关的实例，如果User.class有多个实例会造成Spring异常，提示这个类型会有多个候选者，这个是有在配置使用primary=true表示哪一个Bean是主要
  `User bean = beanFactory.getBean(User.class);`
  + 集合Bean对象
    ListableBeanFactory可以获取类型所有的Bean实例封装到Map返回，key是beanId,value是Bean实例

    ```java
    ListableBeanFactory listableBeanFactory = (ListableBeanFactory)beanFactory;
    Map<String, User> beansOfType = listableBeanFactory.getBeansOfType(User.class);
    ```

+ 根据Bean名称+类型查找
+ 根据Java注解查找
    Spring可以初始化注解修饰的类

    ```java
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Super {}

    @Super
    public class SuperUser extends User{}

    Map<String, User> beansWithAnnotation = (Map)listableBeanFactory.getBeansWithAnnotation(Super.class);
    ```

## IoC依赖注入

Spring提供了哪些依赖注入模式和类型

+ 根据Bean名称注入
+ 根据Bean类型注入
  + 单个Bean对象
  + 集合Bean对象
+ 注入容器内建Bean对象
+ 注入非Bean对象
+ 注入类型
  + 实时注入
  + 延迟注入

## IoC依赖来源

## IoC配置元信息

## IoC容器

## Spring应用上下文

## 使用SpringIoC容器

## SpringIoC容器的生命周期

## 面试题

+ ObjectFactory,BeanFactory,FactoryBean有什么区别
