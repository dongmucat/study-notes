## Vue面试

### Vue工作原理

首先当一个Vue实例被创建的时候，Vue会遍历data中的属性，通过`Observer`类来转换成`getter/setter`的形式来追踪变化，当外界通过`Watcher`读取数据时，会触发`getter`从而`Dep`会将`Watcher`添加到依赖中，当数据发生了变化时候，会触发`setter`，从而向`Dep`中的依赖，也就是`Watcher`发送通知，`Watcher`接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新