---
title: VRChat中导入追加FX Player组件时出现部分动画功能失效问题
description: 解决VRChat中导入新部件时因Write Defaults设置冲突导致动画失效的问题。
pubDate: 2025-12-03
tags: [Unity, Modular Avatar, VRChat]
---

## VRChat中导入需追加FX Player组件时出现部分动画功能失效问题

### 解决办法

导入新部件时（以Uchiwa为例），于右侧Inspector窗体中找到**MA Merge Animator**，并勾选**匹配Avatar的Write Default**。

![勾选Write Default](/images/write-default-problem/image-20251203154707101.png)

### 原因

> https://docs.vrcd.org.cn/books/avatar-Vgf/page/write-defaults
>
> 在启用 Write Defaults 的情况下下：
>
> 当切换到 Hat On 时，帽子会被打开 
> 当切换回 Empty State 状态时，帽子会被关闭（因为帽子被写回了默认状态）
> 在禁用 Write Defaults 的情况下：
>
> 当切换到Hat On时，帽子会被打开 
> 当切换到Empty State时，帽子会保持开启状态（因为没有动画将其关闭，也没有写回默认状态）

![Ash中的Animator](/images/write-default-problem/dc119d02a970012d4747acfdcee549ab.png)

![Uchiwa中的Animator](/images/write-default-problem/15860223fba044dcd7b4e77f85ebaf8f.png)Ash这个模型里面**Write Defaults**是启用的，Uchiwa里面的idle状态下**Write Defaults**是关闭的。

> 不要在一个控制器中混合使用 Write Defaults
> 播放单个 Write Defaults Off 的状态会导致所有其他 Write Defaults On 的状态无法写入其默认值，从而使其表现得像 Write Defaults Off 一样。

在这个情况下如果不在**MA Merge Animator**勾选**匹配 Avater 的 Write Defaults**的情况下就会出现无法写入其默认值的问题。
