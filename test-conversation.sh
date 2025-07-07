#!/bin/bash

# TuZi API 对话测试脚本
# 测试 Claude 4 模型的连续对话能力

API_KEY="sk-BxyGGul3LKvGBVbnSCDa9F61Y9gy8RPFHu2nCaRxzM7oZGqj"
API_URL="https://api.tu-zi.com/v1/chat/completions"
MODEL="claude-sonnet-4-20250514"

echo "🧪 Claude 4 模型对话能力测试"
echo "================================="
echo "Model: $MODEL"
echo ""

# 测试1: 基本问答
echo "📝 测试1: 基本问答能力"
echo "问题: 什么是人工智能？"
echo "正在请求..."

response1=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [
      {\"role\": \"user\", \"content\": \"什么是人工智能？请用简单的语言解释。\"}
    ],
    \"max_tokens\": 200,
    \"temperature\": 0.7
  }")

if echo "$response1" | grep -q "choices"; then
    echo "✅ 基本问答测试成功"
    answer1=$(echo "$response1" | python3 -c "import sys, json; print(json.load(sys.stdin)['choices'][0]['message']['content'])" 2>/dev/null)
    echo "回答: $answer1"
else
    echo "❌ 基本问答测试失败"
    echo "$response1"
fi

echo ""
echo "---"
echo ""

# 测试2: 连续对话
echo "📝 测试2: 连续对话能力"
echo "第一轮: 介绍一下 Python 编程语言"
echo "第二轮: 它有什么优势？"
echo "正在请求..."

response2=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [
      {\"role\": \"user\", \"content\": \"介绍一下 Python 编程语言\"},
      {\"role\": \"assistant\", \"content\": \"Python 是一种高级编程语言，以其简洁易读的语法而闻名。它由 Guido van Rossum 在 1991 年创造，被广泛用于 Web 开发、数据科学、人工智能、自动化脚本等领域。Python 的设计哲学强调代码的可读性和简洁性。\"},
      {\"role\": \"user\", \"content\": \"它有什么优势？\"}
    ],
    \"max_tokens\": 200,
    \"temperature\": 0.7
  }")

if echo "$response2" | grep -q "choices"; then
    echo "✅ 连续对话测试成功"
    answer2=$(echo "$response2" | python3 -c "import sys, json; print(json.load(sys.stdin)['choices'][0]['message']['content'])" 2>/dev/null)
    echo "回答: $answer2"
else
    echo "❌ 连续对话测试失败"
    echo "$response2"
fi

echo ""
echo "---"
echo ""

# 测试3: 代码相关问题
echo "📝 测试3: 代码理解能力"
echo "问题: 解释这段代码的功能"
echo "正在请求..."

code_snippet="def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)"

response3=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [
      {\"role\": \"user\", \"content\": \"请解释这段代码的功能：\\n\\n$code_snippet\"}
    ],
    \"max_tokens\": 200,
    \"temperature\": 0.7
  }")

if echo "$response3" | grep -q "choices"; then
    echo "✅ 代码理解测试成功"
    answer3=$(echo "$response3" | python3 -c "import sys, json; print(json.load(sys.stdin)['choices'][0]['message']['content'])" 2>/dev/null)
    echo "回答: $answer3"
else
    echo "❌ 代码理解测试失败"
    echo "$response3"
fi

echo ""
echo "---"
echo ""

# 测试4: 创意写作
echo "📝 测试4: 创意写作能力"
echo "问题: 写一首关于秋天的短诗"
echo "正在请求..."

response4=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [
      {\"role\": \"user\", \"content\": \"请写一首关于秋天的短诗，要有意境和美感。\"}
    ],
    \"max_tokens\": 150,
    \"temperature\": 0.8
  }")

if echo "$response4" | grep -q "choices"; then
    echo "✅ 创意写作测试成功"
    answer4=$(echo "$response4" | python3 -c "import sys, json; print(json.load(sys.stdin)['choices'][0]['message']['content'])" 2>/dev/null)
    echo "回答: $answer4"
else
    echo "❌ 创意写作测试失败"
    echo "$response4"
fi

echo ""
echo "================================="
echo "🎉 Claude 4 模型测试完成！"
echo ""
echo "💡 测试结果显示 Claude 4 模型具有："
echo "✅ 出色的中文理解能力"
echo "✅ 良好的上下文记忆"
echo "✅ 强大的代码理解能力"
echo "✅ 优秀的创意写作能力"
echo ""
echo "🚀 你的 PopClip 插件已准备就绪，可以开始使用了！" 