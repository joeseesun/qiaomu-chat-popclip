#!/bin/bash

echo "🔍 PopClip 深度调试"
echo "=================="
echo ""

echo "问题：插件图标无法点击"
echo "已尝试：移除 exports，简化配置，但仍无法点击"
echo ""

echo "📋 可能的原因："
echo ""

echo "1️⃣ PopClip 版本不支持 JavaScript"
echo "   - 某些旧版本的 PopClip 不支持 JavaScript 插件"
echo "   - 只支持 URL scheme 或 shell script 插件"
echo ""

echo "2️⃣ JavaScript 语法问题"
echo "   - PopClip 的 JavaScript 引擎可能很老"
echo "   - 不支持某些语法或 API"
echo ""

echo "3️⃣ 配置文件问题"
echo "   - 字段名称错误"
echo "   - 文件路径问题"
echo ""

echo "4️⃣ 权限或安全问题"
echo "   - macOS 安全设置"
echo "   - 文件权限问题"
echo ""

echo "🔧 调试步骤："
echo ""

echo "A. 检查 PopClip 版本"
echo "   - 打开 PopClip 偏好设置"
echo "   - 查看 'About' 或版本信息"
echo "   - 确认版本号和 JavaScript 支持"
echo ""

echo "B. 测试最简插件"
echo "   - 备份现有配置：cp TuZiChat.popclipext/Config.json TuZiChat.popclipext/Config-backup.json"
echo "   - 使用测试配置：cp TuZiChat.popclipext/Config-test.json TuZiChat.popclipext/Config.json"
echo "   - 重新安装插件"
echo "   - 测试是否出现 'Test' 按钮"
echo ""

echo "C. 检查控制台日志"
echo "   - 打开 '控制台' 应用"
echo "   - 搜索 'PopClip' 或 'TuZi'"
echo "   - 查看安装和运行时的错误信息"
echo ""

echo "D. 尝试其他插件类型"
echo "   - 如果 JavaScript 不工作，尝试 URL scheme"
echo "   - 参考你的 Raycast 插件配置"
echo ""

echo "💡 请告诉我："
echo "1. 你的 PopClip 版本号是什么？"
echo "2. 在偏好设置中是否看到插件？"
echo "3. 插件状态是启用还是禁用？"
echo "4. 选择文本时是否出现任何按钮？"
echo "5. 控制台中是否有错误信息？"
echo ""

echo "🚀 如果 JavaScript 不被支持，我们可以："
echo "- 改用 URL scheme 方式"
echo "- 改用 shell script 方式"
echo "- 或者升级 PopClip 版本" 