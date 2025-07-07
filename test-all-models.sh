#!/bin/bash

# TuZi API 多模型测试脚本
# 测试所有支持的模型是否可用

API_KEY="sk-BxyGGul3LKvGBVbnSCDa9F61Y9gy8RPFHu2nCaRxzM7oZGqj"
API_URL="https://api.tu-zi.com/v1/chat/completions"

echo "🧪 TuZi AI 多模型可用性测试"
echo "================================="
echo ""

# 定义所有模型（模型ID和显示名称）
models=(
    "claude-sonnet-4-20250514|Claude 4 Sonnet (推荐)"
    "claude-3-haiku-20240307|Claude 3 Haiku"
    "claude-3-opus-20240229|Claude 3 Opus"
    "o3-mini|O3 Mini"
    "gpt-4o-mini|GPT-4o Mini"
    "gpt-4o|GPT-4o"
    "gpt-4-all|GPT-4 All"
    "gemini-2.5-pro-preview-06-05|Gemini 2.5 Pro Preview"
    "deepseek-v3|DeepSeek V3"
)

success_count=0
total_count=${#models[@]}

# 测试每个模型
for model_entry in "${models[@]}"; do
    # 分离模型ID和显示名称
    model_id="${model_entry%%|*}"
    model_name="${model_entry##*|}"
    
    echo "📝 测试模型: $model_name"
    echo "   ID: $model_id"
    
    # 发送测试请求
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $API_KEY" \
        -d "{
            \"model\": \"$model_id\",
            \"messages\": [
                {\"role\": \"user\", \"content\": \"Hello, please respond with just 'Hi' to test this model.\"}
            ],
            \"max_tokens\": 50,
            \"temperature\": 0.3
        }")
    
    # 分离响应体和状态码
    http_code=$(echo "$response" | tail -n1)
    response_body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ]; then
        echo "   ✅ 可用 (HTTP $http_code)"
        # 尝试提取响应内容
        content=$(echo "$response_body" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data['choices'][0]['message']['content'].strip())
except:
    print('Response extracted successfully')
" 2>/dev/null)
        if [ ! -z "$content" ]; then
            echo "   📄 响应: $content"
        fi
        ((success_count++))
    else
        echo "   ❌ 不可用 (HTTP $http_code)"
        # 尝试提取错误信息
        error_msg=$(echo "$response_body" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if 'error' in data:
        print(data['error'].get('message', 'Unknown error'))
    else:
        print('Unknown error format')
except:
    print('Failed to parse error')
" 2>/dev/null)
        echo "   🔍 错误: $error_msg"
    fi
    
    echo ""
    sleep 1  # 避免请求过于频繁
done

echo "================================="
echo "🎯 测试结果汇总:"
echo "   可用模型: $success_count/$total_count"
echo "   成功率: $((success_count * 100 / total_count))%"
echo ""

if [ $success_count -eq $total_count ]; then
    echo "🎉 所有模型都可用！你的 PopClip 插件已完全就绪。"
elif [ $success_count -gt 0 ]; then
    echo "⚠️  部分模型可用。建议使用测试成功的模型。"
    echo "💡 Claude 4 是默认推荐模型，通常具有最好的兼容性。"
else
    echo "❌ 所有模型都不可用。请检查："
    echo "   1. API 密钥是否正确"
    echo "   2. 网络连接是否正常"
    echo "   3. API 服务是否可用"
fi

echo ""
echo "📖 使用建议:"
echo "   • 优先使用测试成功的模型"
echo "   • Claude 4 通常提供最佳体验"
echo "   • 可以在 PopClip 设置中随时切换模型" 