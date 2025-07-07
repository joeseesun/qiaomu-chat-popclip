#!/bin/bash

echo "🔍 TuZi Chat PopClip 插件最终测试"
echo "=================================="

# 检查插件文件结构
echo "📁 检查插件文件结构..."
if [ -d "TuZiChat.popclipext" ]; then
    echo "✅ 插件目录存在"
    
    # 检查必需文件
    required_files=(
        "Config.json"
        "tuzi-chat.js"
        "reset.js"
        "tuzi-icon.svg"
        "reset-icon.svg"
    )
    
    for file in "${required_files[@]}"; do
        if [ -f "TuZiChat.popclipext/$file" ]; then
            echo "✅ $file 存在"
        else
            echo "❌ $file 缺失"
        fi
    done
else
    echo "❌ 插件目录不存在"
    exit 1
fi

# 验证 JSON 配置
echo ""
echo "🔧 验证配置文件..."
if node -e "JSON.parse(require('fs').readFileSync('TuZiChat.popclipext/Config.json', 'utf8'))" 2>/dev/null; then
    echo "✅ Config.json 格式正确"
else
    echo "❌ Config.json 格式错误"
    exit 1
fi

# 检查 JavaScript 语法
echo ""
echo "📝 检查 JavaScript 语法..."
if node -c "TuZiChat.popclipext/tuzi-chat.js" 2>/dev/null; then
    echo "✅ tuzi-chat.js 语法正确"
else
    echo "❌ tuzi-chat.js 语法错误"
fi

if node -c "TuZiChat.popclipext/reset.js" 2>/dev/null; then
    echo "✅ reset.js 语法正确"
else
    echo "❌ reset.js 语法错误"
fi

# 显示配置摘要
echo ""
echo "📊 插件配置摘要..."
node -e "
const config = JSON.parse(require('fs').readFileSync('TuZiChat.popclipext/Config.json', 'utf8'));
console.log('插件名称:', config.name);
console.log('动作数量:', config.actions.length);
console.log('选项数量:', config.options.length);
console.log('支持的模型:', config.options.find(o => o.identifier === 'model').values.length);
console.log('网络权限:', config.entitlements.includes('network') ? '✅' : '❌');
"

echo ""
echo "🎉 最终测试完成！"
echo ""
echo "📋 安装说明："
echo "1. 双击 TuZiChat.popclipext 文件夹"
echo "2. 在 PopClip 中点击 'Install Extension'"
echo "3. 设置你的 TuZi API 密钥"
echo "4. 开始使用！"
echo ""
echo "📖 详细说明请查看 INSTALL-FINAL.md"
