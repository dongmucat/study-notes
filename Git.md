## Git

### git commitlint

```bash
# 多行示例（第一个-m接的是title，后面的-m是具体内容）
git commit -m 'chore(vue.config.js): :rocket: title_xxxx' -m '1.xxx' -m '2.xxxx'
```

| 类型     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 添加新功能                                                   |
| fix      | 修复问题                                                     |
| chore    | 其他修改，日常修改，依赖更新/脚手架配置修改等，比如有改变构建流程、或者增加依赖库、工具之类的 |
| style    | 不是css，是代码风格相关，且不影响运行结果                    |
| perf     | 优化相关的，比如功能优化、性能提升、提升体验等               |
| docs     | 文档                                                         |
| refactor | 代码重构                                                     |
| revert   | 撤销编辑，回滚                                               |
| test     | 测试相关                                                     |
| ci       | 持续集成                                                     |
| workflow | 工作流程改进                                                 |
| build    | 修改项目构建相关                                             |

### git emoji

emoji                                   | emoji 代码                   | commit 说明
:--------                               | :--------                    | :--------
:tada: (庆祝)                           | `:tada:`                     | 初次提交
:new: (全新)                            | `:new:`                      | 引入新功能
:bookmark: (书签)                       | `:bookmark:`                 | 发行/版本标签
:bug: (bug)                             | `:bug:`                      | 修复 bug
:ambulance: (急救车)                    | `:ambulance:`                | 重要补丁
:globe_with_meridians: (地球)           | `:globe_with_meridians:`     | 国际化与本地化
:lipstick: (口红)                       | `:lipstick:`                 | 更新 UI 和样式文件
:clapper: (场记板)                      | `:clapper:`                  | 更新演示/示例
:rotating_light: (警车灯)               | `:rotating_light:`           | 移除 linter 警告
:wrench: (扳手)                         | `:wrench:`                   | 修改配置文件
:heavy_plus_sign: (加号)                | `:heavy_plus_sign:`          | 增加一个依赖
:heavy_minus_sign: (减号)               | `:heavy_minus_sign:`         | 减少一个依赖
:arrow_up: (上升箭头)                   | `:arrow_up:`                 | 升级依赖
:arrow_down: (下降箭头)                 | `:arrow_down:`               | 降级依赖
:zap: (闪电)<br>:racehorse: (赛马)      | `:zap:`<br>`:racehorse:`      | 提升性能
:chart_with_upwards_trend: (上升趋势图) | `:chart_with_upwards_trend:` | 添加分析或跟踪代码
:rocket: (火箭)                         | `:rocket:`                   | 部署功能
:white_check_mark: (白色复选框)         | `:white_check_mark:`           | 增加测试
:memo: (备忘录)<br>:book: (书)          | `:memo:`<br>`:book:`          | 撰写文档
:hammer: (锤子)                         | `:hammer:`                   | 重大重构
:art: (调色板)                          | `:art:`                      | 改进代码结构/代码格式
:fire: (火焰)                           | `:fire:`                     | 移除代码或文件
:pencil2: (铅笔)                        | `:pencil2:`                  | 修复 typo
:construction: (施工)                   | `:construction:`             | 工作进行中
:wastebasket: (垃圾桶)                  | `:wastebasket:`              | 废弃或删除
:wheelchair: (轮椅)                     | `:wheelchair:`               | 可访问性
:construction_worker: (工人)            | `:construction_worker:`      | 添加 CI 构建系统
:green_heart: (绿心)                    | `:green_heart:`              | 修复 CI 构建问题
:lock: (锁)                             | `:lock:`                     | 修复安全问题
:whale: (鲸鱼)                          | `:whale:`                    | Docker 相关工作
:apple: (苹果)                          | `:apple:`                    | 修复 macOS 下的问题
:penguin: (企鹅)                        | `:penguin:`                  | 修复 Linux 下的问题
:checkered_flag: (旗帜)                 | `:checkered_flag:`           | 修复 Windows 下的问题
:twisted_rightwards_arrows: (交叉箭头)   | `:twisted_rightwards_arrows:`| 分支合并

### git config

```bash
#全局设置
git config --global user.email "useremail"
git config --global user.name "username"

#局部设置(去掉--global)
git config user.email "useremail"
git config user.name "username"
```

### git remote

```bash
git remote -v #可以快速查看当前已经关联的远程仓库列表
git remote add name url #可以关联多个仓库
git remote rm name    #删除远程仓库
git remote rename old_name new_name  #修改仓库名
```

### git checkout

```bash
# 除了分支，我们还经常拉取远程分支
git fetch -a
git checkout -b 本地分支名 origin/远程分支名
```

### git fetch

```bash
# 获取默认远程仓库所有分支的变更
git fetch -a
# 获取 remote origin 对应远程仓库指定 master 分支的变更，但是不和本地的合并
git fetch origin master
# 意思一个样，拉默认的分支而已
git fetch origin
# 也是，等效于 git fetch origin master:master，就是分支配置的默认值
git fetch
```

### git merge

```bash
# 如果目前是在master分支，执行如下命令则将test的内容合并到master分支
git merge test
# 合并 remote origin 对应远程仓库的 master 分支到当前分支
git merge origin/master
# 加入 --squash 表示合并，但是不生成 commit 记录，通常用于把本地分支合入远程分支
git merge test --squash
# 取消合并
git merge --abort
```

### git cherry-pick

> 和 merge 不同的是：`cherry-pick` 合并的是某一次 `commit` 提交的文件，`merge` 合并的是整个分支。且 `merge` 会额外多一条 `merge commit` 的记录，而 `cherry-pick` 不会。

```bash
# 这样就把其他分支的一个 commit 合入当前分支了(需要提前使用git log查看其他分支的commitID)
git cherry-pick commitID
```

### git pull

> git pull是git fetch和git merge的结合，

```bash
# git pull是git pull --merge 的简写，默认是 --merge 模式
# 拉取远程的master分支与当前的分支进行合并
git pull origin master
# 把合并模式切换成 rebase，等于 git fetch 加上 git rebase
git pull --rebase origin master
```

### git push

```bash
# 推送当前分支到远程的master分支
git push origin master
# 有时候没有关联默认远程分支的时候，可以-u 推送并设置默认远程分支
git push -u origin master
# 强制推送，就算本地和远程有差异也推上去
git push -f origin master
# 删除远程主机的 master 分支
git push origin -d master
```

### git stash

**应用场景**：某一天你正在 feature 分支开发新需求，突然产品经理跑过来说线上有bug，必须马上修复。而此时你的功能开发到一半，于是你急忙想切到 master 分支，然后你就会看到报错

**解决方法：**
```bash
#这样代码就保存起来了
git stash 
git checkout master
```

```bash
# 恢复代码
git checkout feature
# apply会将其保留在存储列表中
git stash apply
# pop会将最顶部的弹出
git stash pop
# 其他
# 删除所有的储存
git stash clear
```
### git reset

```bash
# 回退到上个版本，并且还会保存着对于文件的修改
git reset --soft HEAD^
# 强制回退上个版本
git reset --hard HEAD^
# 回退到指定的版本，一般先要用`git log`查看版本的`id`
git reset --hard [commit id/hash]
```

### git revert

> `git revert`和`git reset`有点类似，但是`git revert`是提交一个新的版本，将需要revert的版本的内容再反向修改回去，版本会递增，不影响之前提交的内容.

```bash
# 用法和git reset差不多，把上面的reset改成revert即可
```

### git merge 与 git rebase 的区别

- merge是合并操作，是将两个分支进行合并，并会在目标分支上产生额外的提交记录（合并记录），关注点在于提交的历史
- rebase实际上不是合并操作，它只是复制了当前分支的修改，然后粘贴在目标分支的最新提交的后面，这样的话历史提交记录就会很明朗，关注点在开发干了什么

### git fetch和git pull区别

- `git fetch`只是拉取到本地
- `git pull `不仅拉取到本地还`merge`到本地分支中，所以是`git pull`是`git fetch`和`git merge`的集合体

- `git pull`如果合并需要采用`rebase`模式，可以使用`–rebase`选项。即`git pull --rebase <远程主机名> <远程分支名>:<本地分支名>`

### 代码提交后发现是在错误的分支上怎么办？

- 在刚刚提交的分支上使用

```bash
# 使用soft可以保留上次add的内容
 git reset --soft HEAD^
```

- 利用`stash`

```bash
git stash
git checkout target(目标分支)
git stash pop
git add .
git commit -m 'xxxxx'
```

### GitFlow

#### 流程图

![](http://songnian.gitee.io/imgs/imgs/gitFlow.png)

#### 说明

**重要的分支**

- master分支：线上代码，只有确定可以上线了才可以合并到此处
- develop分支：

**辅助分支**

- feature分支：用于开发功能的分支，必须从最新的develop分支代码拉取。分支命名基本上是feature/xxxxx（和功能相关的名字如feature/login）
- release分支：主要用于给测试人员进行测试，
- hotfix分支：用于线上紧急修复的分支，比如，在线上v1.0登录功能出现问题，我从master拉取代码创建新的分支hotfix/v1.0_login，修改完成后合并到master和develop上

### 删除远程仓库的某个文件

```bash
# 最好先git pull
git rm -r --cached [filename] #带-r表示删除文件夹，不带表示删除文件
git commit -m 'xxxxxx'
git push 
```

### git commit 错误的信息，怎么办？

当使用`git commit -m 'xxx'`时候，`xxx`输入错误、还没`push`的时候，可以使用

```bash
git commit --amend --only -m 'xxxxxxx'
```

