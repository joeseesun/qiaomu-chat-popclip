#!/bin/bash

echo "🔧 TuZi Chat 插件故障排除"
echo "=========================="
echo ""

echo "问题：插件能安装但点击没反应"
echo ""

echo "🚀 解决方案："
echo ""

echo "1️⃣ 首先尝试简化版本测试："
echo "   - 备份当前 Config.json"
echo "   - 使用 Config-simple.json 替换"
echo "   - 重新安装插件"
echo ""

echo "命令："
echo "cp TuZiChat.popclipext/Config.json TuZiChat.popclipext/Config-backup.json"
echo "cp TuZiChat.popclipext/Config-simple.json TuZiChat.popclipext/Config.json"
echo ""

echo "2️⃣ 检查 PopClip 偏好设置："
echo "   - 确保插件已启用"
echo "   - 填入 API Key"
echo "   - 重启 PopClip"
echo ""

echo "3️⃣ 测试步骤："
echo "   - 选择文本 'Hello'"
echo "   - 观察是否出现 'Test Chat' 按钮"
echo "   - 点击按钮，应该显示 'Echo: Hello'"
echo ""

echo "4️⃣ 如果简化版本正常工作："
echo "   - 说明基本功能正常"
echo "   - 问题在于复杂版本的代码"
echo "   - 逐步恢复功能"
echo ""

echo "5️⃣ 如果简化版本也不工作："
echo "   - 检查 PopClip 控制台日志"
echo "   - 确认 JavaScript 语法正确"
echo "   - 检查文件权限"
echo ""

echo "🔍 调试信息收集："
echo "请提供以下信息："
echo "1. PopClip 版本"
echo "2. macOS 版本"
echo "3. 控制台错误日志"
echo "4. 插件在偏好设置中的显示状态"
echo "5. 选中文本时是否出现按钮"
echo ""

echo "💡 常见原因："
echo "- JavaScript 语法错误"
echo "- 导出函数格式不正确"
echo "- Config.json 配置错误"
echo "- API Key 未配置"
echo "- PopClip 权限问题" 