---
title: VRChat中使用Modular Avatar整合各类组件菜单的一种方式
description: 在VRChat中使用Modular Avatar整合多个道具菜单的图文教程，通过Gesture Manager调试实现菜单分类归档。
pubDate: 2025-11-30
tags: [Unity, Modular Avatar, VRChat]
---

## VRChat中使用Modular Avatar整合各类组件菜单的一种方式

#### 本项目使用的工具及其版本

- Unity 2022.3.22f1
- Modular Avatar 1.14.3
- Gesture Manager 3.9.6

### 前言

在VRChat改模过程中经常会出现导入道具越来越多的情况，这种情况下就会出现不同道具的菜单都使用Modular Avatar的MA Menu Installer将新导入道具安装到顶部菜单中，加上原先存在的顶部菜单导致菜单结构臃肿，点击不便，在这种情况下就要进行菜单整理工作。

![通过MA Menu Installer组件将菜单安装到顶部菜单](/images/unity-menu-make/image-20251203135427992.png)

### 通过Gesture Manager进行菜单调试

通过Gesture Manager在进入Play-Mode的状态下可以很方便地在Unity内进行调试角色菜单，预览成果。

加载Gesture Manager后在Unity顶部位置选择Tools，选择Gesture Manager Emulator即可看到Gesture Manager被添加至项目内了，在左侧选择Gesture Manager后查看右侧Inspector，选择Enter Play-Mode，进入模拟模式。

![Gesture Manager导入流程](/images/unity-menu-make/image-20251203141154553.png)

![激活Play-Mode](/images/unity-menu-make/image-20251203141348997.png)

可以看到，由于我们导入了其他组件，加上Avatar原有的菜单，菜单一级界面变得复杂臃肿，我们希望将复杂的一级菜单归类为**角色菜单**、**功能菜单**、**道具菜单**。目前B站确实有一些关于菜单及衣柜相关菜单的介绍，但是我实在是没有找到符合我需求的视频，便自己探索研究了一种在不导入更多复杂插件的情况下可以实现的一种简单办法。

在我们需要对Avatar进行修改的时候需要先退出Play-Mode，即再点击一下上图框选的播放按钮，按钮变灰即退出Play-Mode。

### 更换主菜单

首先我们需要确定Avatar的菜单是如何被配置进去的，在Hierarchy窗体中选择角色Prefab，在右侧的Inspector窗体中下拉找到**Expressions**，其中两个参数分别是**Menu**和**Parameters**，对应菜单及菜单内的字段。

![选定Prefab后找到Expressions](/images/unity-menu-make/image-20251203144730403.png)

我们在Avatar的Assets中新建一个文件夹，命名为Menu，与原文件夹进行区分。右键Assets区域，选择Create后选择Folder。

在Ash模型中，项目原菜单文件夹为VRC_EXMenu。

![新建Menu文件夹](/images/unity-menu-make/image-20251203145030425.png)

进入新建的Menu文件夹中，右键空白处创建**Expressions Menu**。

![新建菜单](/images/unity-menu-make/image-20251203150847417.png)

选择Avatar Prefab，点击**Expressions**中**Reset To Default**重置角色菜单为默认状态。并将新的菜单拖入。

![调整主菜单](/images/unity-menu-make/image-20251203151301642.png)

### 通过Modular Avatar对新菜单进行统一配置

![配置界面](/images/unity-menu-make/image-20251203151622749.png)

在Avatar Prefab点击右键，选择**Create Empty**创建空对象，并进行命名成菜单名称，选择新建的空对象，点击**Add Component**添加**MA Menu Installer**和**MA Menu Item**，在默认情况下**MA Menu Installer**会自动安装到**顶部菜单**即我们上一步新建的菜单中。

![Add Component](/images/unity-menu-make/image-20251203151805618.png)

Item中类型选择**SubMenu**，子菜单来源选择**菜单资源文件**，并将原有角色菜单拖入子菜单资源中，在**MA Menu Item**中拖到最下方，选择**提取为部件**，点击后子菜单来源自动变为**子对象**，并且左侧**Hierarchy**窗体下的角色菜单下已经有了菜单对象即为成功。

![配置子菜单](/images/unity-menu-make/image-20251203152112373.png)

其他已经预制好的Prefab操作方式只需将**MA Menu Installer**中的安装到，点击**选择菜单**选择到对应菜单下即可，如果无法找到对应菜单则可以尝试手动在菜单内新建一个选项后再导入，导入后删除新建的无用选项即可。

![以NadeSystem为例，在MA Menu Installer中点击选择菜单，选中功能菜单即可](/images/unity-menu-make/image-20251203153636531.png)
