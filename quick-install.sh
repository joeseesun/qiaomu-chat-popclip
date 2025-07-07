#!/bin/bash

echo "🚀 TuZi Chat 快速安装"
echo "===================="
echo ""

echo "1️⃣ 检查插件文件..."
if [ -d "TuZiChat.popclipext" ]; then
    echo "✅ 插件目录存在"
else
    echo "❌ 插件目录不存在"
    exit 1
fi

echo ""
echo "2️⃣ 检查必需文件..."
files=("Config.json" "tuzi-chat.js" "tuzi-icon.svg" "reset-icon.svg")
for file in "${files[@]}"; do
    if [ -f "TuZiChat.popclipext/$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file 缺失"
    fi
done

echo ""
echo "3️⃣ 显示配置摘要..."
echo "插件名称: TuZi Chat"
echo "默认模型: claude-sonnet-4-20250514"
echo "API Key: 需要在偏好设置中配置"
echo ""

echo "4️⃣ 安装说明:"
echo "1. 双击 TuZiChat.popclipext 文件夹"
echo "2. 确认安装"
echo "3. 打开 PopClip 偏好设置"
echo "4. 找到 TuZi Chat 插件"
echo "5. 点击 ⚙️ 设置"
echo "6. 输入 API Key: sk-BxyGGul3LKvGBVbnSCDa9F61Y9gy8RPFHu2nCaRxzM7oZGqj"
echo "7. 选择模型: claude-sonnet-4-20250514"
echo ""

echo "🧪 测试步骤:"
echo "1. 在任意文本编辑器中输入: Hello"
echo "2. 选中文本 'Hello'"
echo "3. 观察 PopClip 菜单是否出现 'Chat' 按钮"
echo "4. 点击 'Chat' 按钮"
echo "5. 观察响应"
echo ""

echo "🔧 如果仍然无法点击:"
echo "1. 检查控制台应用中的错误日志"
echo "2. 确认 API Key 已正确配置"
echo "3. 重启 PopClip 应用"
echo "4. 尝试选择不同的文本"
echo ""

echo "主要修复内容:"
echo "- ✅ 添加了 'javascript file' 字段到 Config.json"
echo "- ✅ 修复了 JavaScript 导出格式"
echo "- ✅ 使用 PopClip 兼容的 JavaScript 语法"
echo "- ✅ 替换 async/await 为 XMLHttpRequest"
echo "- ✅ 替换 const/let 为 var"
echo "- ✅ 修复了所有语法错误" 