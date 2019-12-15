# Git多人单分支集成协作时的常见场景

## 不同人修改了不同文件如何处理

实验环境:在github上在本地克隆两个，分别模拟两个不同用户提交

1. 当A用户提交代码到远端后，B将commit推送到远端会报错，非fast-ward，应该先拉远端仓库的代码后重新提交
`git fetch`
`git branch -av`

```log
* master                e96139e [ahead 1, behind 1] add newfile
  remotes/origin/HEAD   -> origin/master
  remotes/origin/master 9a0ec01 'test'
```

**e96139e [ahead 1, behind 1] add newfile**
ahead 1 表示本地还有一个commit没有提交
behind 1 远端还有一个commit没有同步

`git merge remotes/origin/master`开始从远端代码拉取到本地，并且合并

```log
G:\gittest\gitlearning_2>git merge remotes/origin/master
Adding moments/setupWindchill.png
Adding moments/aaa.html
Adding moments/CentOS.png
Merge made by the 'recursive' strategy.
 readme.md | 12 ++----------
 1 file changed, 2 insertions(+), 10 deletions(-)
 ```

日志显示readme.md文件的变化,合并完成后可以执行`git push`就可以将本地的commit提交到远端了

## 不同人修改了同文件的不同区域如何处理

后提交的人会被git拒绝，需要先`git fetch`和`git merge`合并后才可以提交
合并完成后会在自动产生一个新的提交commit

```log
commit cadd036f0fc7b17a070dadae6553fe9907de3d5a (HEAD -> master)
Merge: 747fad1 f7567af
Author: huchaolan <huchaolan@aliyun.com>
Date:   Sun Dec 15 16:46:37 2019 +0800

    Merge commit 'f7567af'

commit 747fad1533d6a6e40715a2cd62faeb99092dbd98
Author: huchaolan <huchaolan@aliyun.com>
Date:   Sun Dec 15 16:45:50 2019 +0800

    我是git-leanr2

commit f7567af47f88caac7943f8dfa6b44bca199346cd (origin/master, origin/HEAD)
Author: huchaolan <huchaolan@aliyun.com>
Date:   Sun Dec 15 16:43:16 2019 +0800
```

提交cadd036的日志显示`Merge: 747fad1 f7567af`,表示这个commit由两个747fad1和f7567af合并而来
f7567af是远端仓库，747fad1是本地仓库，合并后产生了一个新的commit
运行`git push`后会将747fad1和cadd036都提交到远端仓库中

## 不同人修改了同文件的同一区域如何处理

代码在提交时报冲突了,如何解决冲突

当合并代码后会提示代码有冲突，这个时候有冲突的代码块在合并时会标记出来，标记情况是本地仓库和远端仓库
代码都会显示出来由用户手动合并代码，然后再`git add`和`git commit`一次即可。
从日志中这个commit是由本地和远程仓库最新版本公共产生的

```log
<<<<<< HEAD
git_lean2
git_lean2
git_lean2
=======
git_lean1
git_lean1
git_lean1
>>>>>>> 61cdee2
```

HEAD表示本地仓库，下面61cdee2是远程仓库的，这里<<<和>>>还有==是可以删除的