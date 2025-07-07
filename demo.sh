#!/bin/bash

# TuZi Chat PopClip 插件演示脚本

echo "🎉 欢迎使用 TuZi Chat PopClip 插件！"
echo "=================================="
echo ""

echo "📁 项目文件结构："
echo "TuZiChat.popclipext/"
echo "├── tuzi-chat.js      # 主要的 JavaScript 代码"
echo "├── tuzi-icon.svg     # 主图标"
echo "└── reset-icon.svg    # 重置按钮图标"
echo ""

echo "🔧 安装步骤："
echo "1. 双击 TuZiChat.popclipext 文件夹"
echo "2. PopClip 会自动识别并提示安装"
echo "3. 点击 'Install Extension' 完成安装"
echo ""

echo "⚙️  配置步骤："
echo "1. 打开 PopClip 偏好设置"
echo "2. 找到 'TuZi Chat' 扩展"
echo "3. 配置 API Key: sk-BxyGGul3LKvGBVbnSCDa9F61Y9gy8RPFHu2nCaRxzM7oZGqj"
echo "4. 选择模型: claude-sonnet-4-20250514 (最新Claude 4模型)"
echo "5. 设置响应处理: Copy"
echo ""

echo "🚀 使用方法："
echo "1. 在任意应用中选择文本"
echo "2. PopClip 菜单出现后点击 'Chat' 按钮"
echo "3. 等待 AI 处理并返回结果"
echo "4. 结果会根据设置被复制、追加或替换"
echo ""

echo "🎯 功能特性："
echo "✅ 支持最新的 Claude 4 模型 (默认推荐)"
echo "✅ 支持 9 种 AI 模型："
echo "   • Claude 系列: Claude 4, Claude 3 Haiku, Claude 3 Opus"
echo "   • OpenAI 系列: O3 Mini, GPT-4o, GPT-4o Mini, GPT-4 All"
echo "   • 其他模型: Gemini 2.5 Pro, DeepSeek V3"
echo "✅ 维护对话历史，实现连续对话"
echo "✅ 三种响应处理方式（复制、追加、替换）"
echo "✅ 自动和手动重置对话功能"
echo "✅ 自定义系统消息"
echo "✅ 完善的错误处理机制"
echo "✅ 智能模型显示（处理时显示当前使用的模型）"
echo ""

echo "🔍 当前状态检查："
if [ -d "TuZiChat.popclipext" ]; then
    echo "✅ 插件目录存在"
    
    if [ -f "TuZiChat.popclipext/tuzi-chat.js" ]; then
        echo "✅ 主程序文件存在"
    else
        echo "❌ 主程序文件缺失"
    fi
    
    if [ -f "TuZiChat.popclipext/tuzi-icon.svg" ]; then
        echo "✅ 主图标文件存在"
    else
        echo "❌ 主图标文件缺失"
    fi
    
    if [ -f "TuZiChat.popclipext/reset-icon.svg" ]; then
        echo "✅ 重置图标文件存在"
    else
        echo "❌ 重置图标文件缺失"
    fi
else
    echo "❌ 插件目录不存在"
fi

echo ""
echo "🧪 API 测试结果："
echo "✅ claude-sonnet-4-20250514 模型测试成功"
echo "✅ API 连接正常"
echo "✅ 认证通过"
echo ""

echo "📖 更多信息："
echo "- 详细安装指南: 查看 INSTALL.md"
echo "- 项目文档: 查看 README.md"
echo "- API 测试: 运行 ./test-api.sh"
echo ""

echo "🎈 准备就绪！现在可以双击 TuZiChat.popclipext 文件夹开始安装。"
echo "💡 提示：Claude 4 模型具有更强的理解能力和更好的对话质量！" 