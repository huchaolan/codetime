# 独自使用git的场景

只在本地仓库变更，没有提交到远程仓库

+ 怎么删除不用的分支?
`git branch -d 分支名称`
`git branch -D 分支名称`

+ 怎么修改commit消息
`git commit --amend` 修改最新一次提交的commit的消息

+ 怎么修改旧的commit消息
`git rebase -i [commit的父亲id]` 交互式

+ 怎样将多个commit合并成一个
`git rebase -i [需要合并最早的commit]`

    命令完成后会出现最原始的commit到最新commit的msg

    ``` base
    pick 412312 Add style.css
    pick 123123 xxx
    pick 65433543 YYYYY
    ```

    1. 选择一个commitmsg最为合并后的msg,然后将其他需要合并行的pick改成squash
    2. 然后保存后一个新的对话框将合并后msg提示出来
+ 怎么讲间隔几个commit整理一个commit
`git rebase -i [最原始的commit]`

    ``` base
    pick 412312 Add style.css
    pick 123123 xxx
    pick 65433543 YYYYY
    ```

    想把412312和65433543合并在一个commit中

+ 怎么比较暂存区和HEAD所含文件的差异
`git diff --cached`

+ 怎么比较工作区和暂存区所含文件的差异
`git diff` 比较所有修改过的文件
`git diff -- readme.md` 比较单个文件

+ 恢复暂存区的文件和HEAD一样
`git reset HEAD` 会回滚所有未提交到远程的commit

+ 如何让工作区的文件恢复为和暂存区一样
`git checkout -- file` 将一个文件恢复到暂存区内容

+ 怎样取消暂存区部分文件的更改
`git reset HEAD -- file` 会回滚指定未提交到远程的commit

+ 消除最近的几次提交
`git reset --hard [commit]`

+ 看看不同提交的指定文件的差异
`git diff [分支名称] [分支名称1] -- 文件名`
`git diff [commit] [commit] -- 文件名`

+ 开发中临时加塞了紧急任务
处理过程是先将开发到一半的代码保存起来，但是不提交，也不会产生commit，等处理完成后再之前保存的代码恢复继续开发
`git stash` 保存，将没有commit代码压入堆栈
`git stash list` 查看堆栈
`git stash pop` 弹出堆栈，会删除堆栈顶
`git stash apply` 将堆栈顶部回复到工作区

+ 如何指定不需要Git管理的文件
使用.gitignore文件来管理不需要提交文件，可以配置文件和文件夹
通过通配符*来配置
