#!/bin/bash

echo "🔍 PopClip 插件诊断工具"
echo "========================"
echo ""

echo "当前问题：插件图标无法点击"
echo ""

echo "📋 诊断步骤："
echo ""

echo "1️⃣ 备份现有配置"
echo "   cp TuZiChat.popclipext/Config.json TuZiChat.popclipext/Config-backup.json"
echo ""

echo "2️⃣ 使用最简配置测试"
echo "   cp TuZiChat.popclipext/Config-minimal.json TuZiChat.popclipext/Config.json"
echo ""

echo "3️⃣ 重新安装插件"
echo "   - 卸载现有插件"
echo "   - 双击 TuZiChat.popclipext 安装"
echo ""

echo "4️⃣ 测试基本功能"
echo "   - 选择文本 'Hello'"
echo "   - 观察是否出现 'Test' 按钮"
echo "   - 点击按钮，应该显示 'Test: Hello'"
echo ""

echo "5️⃣ 如果最简版本工作："
echo "   - 说明基本架构正确"
echo "   - 问题在于复杂配置"
echo "   - 逐步添加功能"
echo ""

echo "6️⃣ 如果最简版本不工作："
echo "   - 检查 JavaScript 语法"
echo "   - 查看控制台错误"
echo "   - 检查文件权限"
echo ""

echo "🔧 常见问题检查："
echo ""

echo "A. 检查 PopClip 版本兼容性"
echo "   - 打开 PopClip 偏好设置"
echo "   - 查看版本号"
echo "   - 确认支持 JavaScript 插件"
echo ""

echo "B. 检查文件权限"
echo "   ls -la TuZiChat.popclipext/"
echo ""

echo "C. 检查 JavaScript 语法"
echo "   - 使用 node 检查语法"
echo "   - 确认没有语法错误"
echo ""

echo "D. 检查图标文件"
echo "   - 确认 tuzi-icon.svg 存在"
echo "   - 检查 SVG 格式正确"
echo ""

echo "执行诊断命令："
echo "bash diagnose.sh"
echo ""

echo "请按步骤执行，并告诉我每步的结果！" 