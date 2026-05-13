---
title: 迁移现有Hexo至腾讯云EdgeOne Pages
description: 记录将Hexo博客迁移至腾讯云EdgeOne Pages的完整过程，包括Git仓库配置、项目创建和域名绑定。
pubDate: 2026-02-14
tags: [Blog, Hexo]
---

## 迁移现有Hexo至腾讯云EdgeOne Pages

### 前言

**注意** 本项目并非从头搭建Hexo并迁移至腾讯云EdgeOne Pages。如果需要搭建Hexo，需要自行寻找教程。

写这篇博客纯粹是作为记录而写，本人在腾讯云的LightHouse快要到期了，而且也不是新用户参加不了优惠续费活动。之前考虑过使用Gitee Pages但是到目前为止Gitee Pages已经停运了。Github、GitLab、CloudFlare Pages确实是一个可行的选项，但是受限于网络问题偶尔会出现无法访问或是访问速度过慢的问题。在找替代方案的时候恰巧腾讯云出了一个EdgeOne Pages的项目，并且还有全球CDN节点加速可用，于是将Hexo迁移到EdgeOne Pages上了。

### Git仓库处理

1. 首先你得有一个本地的Hexo文件夹

![本地Hexo目录](/images/edgeone-hexo/image-20260214190001703.png)

2. 去Gitee或者Github创建一个仓库（至于是私有还是公开取决于你自己）

![Gitee创建仓库](/images/edgeone-hexo/image-20260214190208769.png)

3. 照着新仓库里配置在Git里面配置Git全局配置
4. 在Git里面使用**git init**初始化仓库

![照着初始化仓库](/images/edgeone-hexo/image-20260214190438077.png)

5. Git的命令行界面看起来比较费事，这一步可以用VSCode或者是其他类似VSCode的IDE来处理，我这里用的Trae

![Trae的源代码管理区域](/images/edgeone-hexo/image-20260214190606154.png)

6. 前几步没有问题你就可以看到有暂存区了，在提交变更内容的地方写上变更内容，点击提交就可以推送到仓库了

![提交](/images/edgeone-hexo/image-20260214190747446.png)

7. 仓库里应该有你刚推送上来的东西就对了

![Gitee仓库](/images/edgeone-hexo/image-20260214190900283.png)

8. 在腾讯云控制台里搜索EdgeOne，找到如下页面

![Pages页面](/images/edgeone-hexo/image-20260214191034924.png)

9. 创建项目，选择导入Git仓库，选择刚才创建的仓库

![创建项目](/images/edgeone-hexo/image-20260214191134359.png)

**注：加速区域如果含有中国大陆地区需要实名认证+域名备案**

10. 等他构建完了就可以预览并且绑定了

![构建成功](/images/edgeone-hexo/image-20260214191327036.png)

11. 在域名管理这里他会给你一个域名，你按照要求完成域名所有权验证之后CNAME解析他给的地址就可以用自己域名访问了

![绑定自己的域名](/images/edgeone-hexo/image-20260214191452045.png)
