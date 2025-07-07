# TuZi Chat PopClip 插件安装指南

## 快速开始

### 第一步：安装插件

1. **打开Finder，导航到插件目录**
   ```bash
   cd /Users/joe/Dropbox/code/popclip/ChatAI
   ```

2. **双击插件文件夹**
   - 双击 `TuZiChat.popclipext` 文件夹
   - PopClip 会自动识别并提示安装
   - 点击 "Install Extension" 按钮

### 第二步：配置插件

1. **打开 PopClip 偏好设置**
   - 点击菜单栏的 PopClip 图标
   - 选择 "Preferences..."

2. **找到 TuZi Chat 扩展**
   - 在扩展列表中找到 "TuZi Chat"
   - 点击右侧的设置按钮 ⚙️

3. **配置必需选项**
   - **API Key**: `sk-BxyGGul3LKvGBVbnSCDa9F61Y9gy8RPFHu2nCaRxzM7oZGqj`
   - **Model**: 选择 `claude-sonnet-4-20250514`（最新Claude 4模型，推荐）
   - **Response Handling**: 选择 `Copy`（推荐）

4. **可选配置**
   - **System Message**: 保持默认或自定义
   - **Reset Timer**: 设置为 `15` 分钟
   - **Show Reset Button**: 启用

### 第三步：测试插件

#### 基本测试
1. 在任意文本编辑器中输入：`Hello, how are you?`
2. 选中这段文本
3. PopClip 菜单应该出现 "Chat" 按钮
4. 点击 "Chat" 按钮
5. 等待处理（会显示 "🤖 TuZi AI thinking..."）
6. 响应会被复制到剪贴板

#### 连续对话测试
1. 第一次：选择 `What is artificial intelligence?`
2. 点击 "Chat"
3. 第二次：选择 `Can you explain it in simple terms?`
4. 点击 "Chat"
5. AI 应该能理解上下文并给出相关回答

#### 重置功能测试
1. 点击 PopClip 中的 "Reset" 按钮
2. 应该显示 "✅ Reset complete"
3. 对话历史被清空

## 功能说明

### 响应处理模式

#### Copy 模式（推荐）
- AI 响应会被复制到剪贴板
- 适合需要将回答粘贴到其他地方的场景

#### Replace 模式
- AI 响应会替换选中的文本
- 适合直接编辑文档的场景

#### Append 模式
- 会显示原问题和AI回答
- 格式：`原问题\n\n---\n\nAI回答`

### 快捷键

- **Shift + 点击 Chat**: 强制使用复制模式
- **Option + 点击 Chat**: 切换替换/追加模式

### 自动重置

- 默认15分钟无活动后自动重置对话
- 可在设置中调整或禁用

## 故障排除

### 常见问题

#### 1. 插件不显示
**可能原因：**
- PopClip 版本过低
- 插件安装失败

**解决方案：**
- 确保 PopClip 版本 ≥ 4.0
- 重新安装插件

#### 2. API 调用失败
**可能原因：**
- API 密钥无效
- 网络连接问题
- API 服务不可用

**解决方案：**
1. 检查 API 密钥是否正确
2. 测试网络连接
3. 运行测试脚本：`./test-api.sh`

#### 3. 图标不显示
**可能原因：**
- SVG 文件损坏
- 文件路径错误

**解决方案：**
- 检查 `tuzi-icon.svg` 和 `reset-icon.svg` 文件
- 重新下载插件

### 调试方法

#### 查看日志
1. 打开 "控制台" 应用
2. 搜索 "PopClip"
3. 查看相关错误信息

#### 测试 API 连接
```bash
# 运行测试脚本
./test-api.sh

# 或手动测试
curl -X POST https://api.tu-zi.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model": "claude-sonnet-4-20250514", "messages": [{"role": "user", "content": "test"}]}'
```

## 高级配置

### 自定义系统消息示例

#### 翻译助手
```
You are a professional translator. Translate the selected text to Chinese and provide both literal and natural translations.
```

#### 代码审查助手
```
You are a senior software engineer. Review the selected code and provide suggestions for improvement, focusing on best practices, performance, and maintainability.
```

#### 写作助手
```
You are a professional editor. Help improve the selected text by correcting grammar, enhancing clarity, and suggesting better word choices.
```

### 模型选择指南

#### Claude 系列
- **Claude 4 Sonnet** (claude-sonnet-4-20250514) - 🌟 强烈推荐
  - 最新的 Claude 4 模型
  - 更强的理解能力和推理能力
  - 更好的对话质量和准确性
  - 适合所有场景

- **Claude 3 Haiku** (claude-3-haiku-20240307)
  - 速度最快，成本最低
  - 适合简单任务

- **Claude 3 Opus** (claude-3-opus-20240229)
  - 最强推理能力
  - 适合复杂分析任务

#### OpenAI 系列
- **O3 Mini** (o3-mini)
  - 最新的 O3 系列模型
  - 高效轻量级选择

- **GPT-4o** (gpt-4o)
  - 多模态支持
  - 创意能力强
  - 适合复杂任务

- **GPT-4o Mini** (gpt-4o-mini)
  - 轻量版 GPT-4o
  - 速度快，成本低

- **GPT-4 All** (gpt-4-all)
  - 全能版 GPT-4
  - 综合能力强

#### 其他模型
- **Gemini 2.5 Pro Preview** (gemini-2.5-pro-preview-06-05)
  - Google 最新模型
  - 强大的多模态能力

- **DeepSeek V3** (deepseek-v3)
  - 国产优秀模型
  - 代码和推理能力出色

## 卸载插件

1. 打开 PopClip 偏好设置
2. 找到 "TuZi Chat" 扩展
3. 点击 "Uninstall" 按钮
4. 确认卸载

## 更新插件

1. 下载新版本插件
2. 双击新的 `.popclipext` 文件夹
3. 选择 "Replace" 替换旧版本
4. 重新配置设置（如需要）

## 技术支持

如果遇到问题，请：
1. 查看本指南的故障排除部分
2. 运行 `./test-api.sh` 测试 API 连接
3. 检查 PopClip 控制台日志
4. 提交 GitHub Issue 寻求帮助

---

**注意：** 当前 TuZi API 可能处于维护状态，如果遇到 503 错误，请稍后再试。 