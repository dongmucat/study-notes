## Git

### 设置用户名和邮箱

```
git config --global user.email <useremail>   //邮箱
git config --global user.name <username> //密码
```

### git merge 与 git rebase 的区别

- merge是合并操作，是将两个分支进行合并，并会在目标分支上产生额外的提交记录（合并记录），关注点在于提交的历史
- rebase实际上不是合并操作，它只是复制了当前分支的修改，然后粘贴在目标分支的最新提交的后面，这样的话历史提交记录就会很明朗，关注点在开发干了什么

### git stash

**应用场景：**某一天你正在 feature 分支开发新需求，突然产品经理跑过来说线上有bug，必须马上修复。而此时你的功能开发到一半，于是你急忙想切到 master 分支，然后你就会看到报错

**解决方法：**

```
//这样代码就保存起来了
git stash 
git checkout master
```

```
//恢复代码
git checkout feature 
git stash apply
```

### 代码提交后发现是在错误的分支上怎么办？

- 在刚刚提交的分支上使用

```
# 使用soft可以保留上次add的内容
 git reset --soft HEAD^
```

- 利用`stash`

```
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

### 时光倒流

#### git reset --soft HEAD^

回退到上个版本，并且还会保存着对于文件的修改

#### git reset --hard HEAD^

强制回退上个版本

#### git reset --hard [commit id/hash]

回退到指定的版本，一般先要用`git log`查看版本的`id`

### 删除远程仓库的某个文件

```
// 最好先git pull
git rm -r --cached [filename] //带-r表示删除文件夹，不带表示删除文件
git commit -m 'xxxxxx'
git push 
```

### git commit 错误的信息，怎么办？

当使用`git commit -m 'xxx'`时候，`xxx`输入错误、还没`push`的时候，可以使用

```
git commit --amend --only -m 'xxxxxxx'
```

