## Git

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

