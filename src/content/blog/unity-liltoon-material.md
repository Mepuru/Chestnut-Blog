---
title: VRChat中根据PNG图片创建Material材质球并应用
description: 在VRChat中使用liltoon为Kipfel模型创建自定义材质球的图文教程，涉及PS处理PNG签名和Unity中创建Material。
pubDate: 2026-01-14
tags: [Unity, VRChat]
---

## VRChat中根据PNG图片创建Material材质球并应用

#### 本项目使用的物料及其版本

- Unity 2022.3.22f1
- liltoon 2.3.2
- Kipfel 1.2.0
- PhotoShop
- 手写签名生成器（[GitHub - jyxwant/free-handwritten-signature-generator](https://github.com/jyxwant/free-handwritten-signature-generator)）

### 前言

Kipfel身上有一个小挂包，挂包上面有一个小名牌，在Kipfel的文件目录下Texture\PC\PNG路径里存在**kipfel_silver.png**文件，还存在有一个**kipfel_silver(edit).png**文件。

![kipfel_silver(edit).png](/images/unity-liltoon-material/kipfel_silver(edit).png)![kipfel_silver.png](/images/unity-liltoon-material/image-20260114143429146.png)

可以看到带有**(edit)**标识的内容在小名牌位置没有字体，可以由玩家自己进行修改。

### 使用PS

很简单，打开PS，把搞好的透明底签名拖到PS里面，调整好位置就完成了。

![就这么简单](/images/unity-liltoon-material/image-20260114144635340.png)

### Unity操作

把上一步处理好的PNG文件拖进你的工程文件目录里。

![拖进去](/images/unity-liltoon-material/image-20260114145050001.png)

右键点击工程文件目录空白处，鼠标移动到Create，找到Material。

![新建Material](/images/unity-liltoon-material/image-20260114145251605.png)

选中新建的Material，在Inspect窗口中点击一下小锁头按键，让Inspect页面锁定。将刚才准备的PNG文件拖入Albedo选项的小方块中。

![设置材质球](/images/unity-liltoon-material/image-20260114145525797.png)

选择Shader，选择liltoon，材质球就算处理完毕了。

![liltoon](/images/unity-liltoon-material/image-20260114145630458.png)

将材质球命名好，放到工程文件的对应目录下（在Kipfel中为**Material/PC**）将新建的Material拖到想要应用材质球的地方即可。
