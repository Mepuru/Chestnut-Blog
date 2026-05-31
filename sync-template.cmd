@echo off
REM sync-template.cmd — 将 main 的主题改动同步到 template 分支
REM 用法: 在 main 分支上执行  sync-template.cmd
REM
REM 原理: 合并 main → template，然后恢复 template 独有的配置文件，
REM       再清空私人内容目录，保留示例文件。

echo === [1/7] 确认当前在 main 分支 ===
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%i
if not "%BRANCH%"=="main" (
    echo 请先在 main 分支上执行此脚本
    exit /b 1
)

echo === [2/7] 推送 main ===
git push origin main
if %errorlevel% neq 0 exit /b %errorlevel%

echo === [3/7] 切换到 template 并合并 main ===
git checkout template
git merge main --no-edit
if %errorlevel% neq 0 (
    echo 合并冲突，请手动解决后重新执行
    exit /b %errorlevel%
)

echo === [4/7] 恢复 template 专属配置（覆盖从 main 带入的私人内容）===
git checkout ORIG_HEAD -- ^
    src/config/site.ts ^
    src/content/pages/about.md ^
    README.md

echo === [5/7] 删除私人文章，保留示例文件 ===
REM 删除 blog/ 下所有 .md，然后单独恢复示例
del /q src\content\blog\*.md 2>nul
git checkout ORIG_HEAD -- src\content\blog\hello-maroon.md

REM 删除 docs/ 下所有 .md，然后单独恢复示例
del /q src\content\docs\*.md 2>nul
git checkout ORIG_HEAD -- src\content\docs\getting-started.md

echo === [6/7] 提交并推送 template ===
git add -A
git commit -m "sync: template 同步主题更新" --allow-empty
git push origin template

echo === [7/7] 切回 main ===
git checkout main

echo === 完成！template 已同步 ===
