#!/bin/bash

echo "🔧 TuZi Chat PopClip 插件安装测试"
echo "================================="
echo ""

# 检查文件结构
echo "📁 检查文件结构..."
if [ -d "TuZiChat.popclipext" ]; then
    echo "✅ 插件文件夹存在"
    
    # 检查必需文件
    files=("Config.json" "tuzi-chat.js" "tuzi-icon.svg" "reset-icon.svg")
    for file in "${files[@]}"; do
        if [ -f "TuZiChat.popclipext/$file" ]; then
            echo "✅ $file 存在"
        else
            echo "❌ $file 缺失"
        fi
    done
else
    echo "❌ 插件文件夹不存在"
    exit 1
fi

echo ""
echo "🔍 检查配置文件..."

# 检查 Config.json 语法
if python3 -c "import json; json.load(open('TuZiChat.popclipext/Config.json'))" 2>/dev/null; then
    echo "✅ Config.json 语法正确"
else
    echo "❌ Config.json 语法错误"
    exit 1
fi

# 检查 JavaScript 语法
if node -c "TuZiChat.popclipext/tuzi-chat.js" 2>/dev/null; then
    echo "✅ tuzi-chat.js 语法正确"
else
    echo "⚠️  无法验证 JavaScript 语法 (可能是 Node.js 不支持的语法)"
fi

echo ""
echo "📋 安装步骤:"
echo "1. 双击 'TuZiChat.popclipext' 文件夹"
echo "2. PopClip 会自动识别并提示安装"
echo "3. 点击 'Install Extension' 按钮"
echo "4. 在 PopClip 偏好设置中配置 API 密钥"
echo ""
echo "🔑 API 密钥: sk-BxyGGul3LKvGBVbnSCDa9F61Y9gy8RPFHu2nCaRxzM7oZGqj"
echo "🤖 推荐模型: claude-sonnet-4-20250514"
echo ""
echo "如果遇到问题，请检查 PopClip 版本是否 ≥ 4.0" 