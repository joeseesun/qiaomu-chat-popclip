#!/bin/bash

echo "🔧 自动修复 PopClip 插件"
echo "======================="
echo ""

echo "步骤 1: 备份现有配置"
cp TuZiChat.popclipext/Config.json TuZiChat.popclipext/Config-backup.json
echo "✅ 配置已备份"

echo ""
echo "步骤 2: 使用最简配置"
cp TuZiChat.popclipext/Config-minimal.json TuZiChat.popclipext/Config.json
echo "✅ 已切换到最简配置"

echo ""
echo "步骤 3: 检查文件完整性"
files=("Config.json" "test-simple.js" "tuzi-icon.svg")
for file in "${files[@]}"; do
    if [ -f "TuZiChat.popclipext/$file" ]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 缺失"
    fi
done

echo ""
echo "步骤 4: 显示当前配置"
echo "插件名称: TuZi Test"
echo "JavaScript 文件: test-simple.js"
echo "动作: Test"
echo ""

echo "步骤 5: 安装说明"
echo "1. 在 PopClip 偏好设置中删除现有的 TuZi Chat 插件"
echo "2. 双击 TuZiChat.popclipext 文件夹重新安装"
echo "3. 不需要配置任何选项"
echo "4. 选择文本 'Hello' 测试"
echo "5. 应该出现 'Test' 按钮"
echo "6. 点击后应该显示 'Test: Hello'"
echo ""

echo "如果最简版本工作，运行以下命令恢复完整功能："
echo "cp TuZiChat.popclipext/Config-backup.json TuZiChat.popclipext/Config.json"
echo ""

echo "🎯 关键修复点："
echo "- 移除了所有复杂选项"
echo "- 使用最简单的 JavaScript 函数"
echo "- 只有一个 Test 动作"
echo "- 无需 API Key 配置"
echo ""

echo "现在请："
echo "1. 删除现有插件"
echo "2. 重新安装"
echo "3. 测试 'Hello' 文本"
echo "4. 告诉我结果！" 