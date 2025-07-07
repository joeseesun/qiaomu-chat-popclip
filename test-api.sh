#!/bin/bash

# TuZi API 测试脚本
# 用于验证 API 密钥是否有效

API_KEY="sk-BxyGGul3LKvGBVbnSCDa9F61Y9gy8RPFHu2nCaRxzM7oZGqj"
API_URL="https://api.tu-zi.com/v1/chat/completions"
MODEL="claude-sonnet-4-20250514"

echo "🧪 正在测试 TuZi API 连接..."
echo "API URL: $API_URL"
echo "Model: $MODEL"
echo "API Key: ${API_KEY:0:10}..."
echo ""

# 测试 API 调用
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [
      {\"role\": \"user\", \"content\": \"Hello, this is a test message. Please respond with a simple greeting.\"}
    ],
    \"max_tokens\": 100,
    \"temperature\": 0.7
  }")

# 分离响应体和状态码
http_code=$(echo "$response" | tail -n1)
response_body=$(echo "$response" | sed '$d')

echo "HTTP 状态码: $http_code"
echo ""

if [ "$http_code" = "200" ]; then
    echo "✅ API 测试成功！"
    echo "使用模型: $MODEL"
    echo "响应内容:"
    echo "$response_body" | python3 -m json.tool 2>/dev/null || echo "$response_body"
else
    echo "❌ API 测试失败！"
    echo "错误信息:"
    echo "$response_body"
fi

echo ""
echo "如果测试成功，你可以继续安装 PopClip 插件。"
echo "如果测试失败，请检查："
echo "1. 网络连接是否正常"
echo "2. API 密钥是否有效"
echo "3. 模型 '$MODEL' 是否可用"
echo "4. API 服务是否可用" 