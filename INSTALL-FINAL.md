# TuZi Chat PopClip 插件 - 最终安装指南

## 🎯 插件概述

TuZi Chat 是一个强大的 PopClip 扩展，让你可以直接在任何应用中选择文本并与 AI 对话。

### ✨ 主要特性

- **9个AI模型支持**：Claude 4、Claude 3 系列、GPT-4o 系列、O3 Mini、Gemini 2.5 Pro、DeepSeek V3
- **智能对话管理**：自动维护对话历史，支持上下文连续对话
- **多种响应模式**：追加、复制、替换三种处理方式
- **自动重置**：可配置的对话超时重置
- **快捷键支持**：Shift、Option 键快速切换模式

## 📋 安装前准备

### 1. 系统要求
- macOS 10.15 或更高版本
- PopClip 应用已安装
- 有效的 TuZi API 密钥

### 2. 获取 API 密钥
1. 访问 [tu-zi.com](https://api.tu-zi.com)
2. 注册账户并获取 API 密钥
3. 确保账户有足够的额度

## 🔧 安装步骤

### 方法一：直接安装（推荐）
1. **双击 `TuZiChat.popclipext` 文件夹**
2. **PopClip 会自动打开并提示安装**
3. **点击 "Install Extension" 确认安装**
4. **如果出现"未签署的扩展"警告，点击 "Install Anyway"**

### 方法二：手动安装
1. 将 `TuZiChat.popclipext` 文件夹复制到以下位置：
   ```
   ~/Library/Application Support/PopClip/Extensions/
   ```
2. 重启 PopClip 应用

## ⚙️ 配置设置

安装完成后，需要配置插件：

### 1. 打开 PopClip 设置
- 点击菜单栏的 PopClip 图标
- 选择 "Preferences..."
- 点击 "Extensions" 标签

### 2. 配置 TuZi Chat
找到 "TuZi Chat" 扩展，点击设置按钮：

#### 必填设置
- **TuZi API Key**: 输入你的 API 密钥

#### 可选设置
- **AI Model**: 选择要使用的AI模型（默认：Claude 4）
- **Response Mode**: 选择响应处理方式
  - `Append`: 追加问题和答案
  - `Copy Only`: 仅复制AI回复
  - `Replace Text`: 替换选中文本
- **System Message**: 设置AI助手的行为指令
- **Auto Reset**: 设置对话自动重置时间（分钟）

## 🚀 使用方法

### 基本使用
1. **选择任意文本**
2. **PopClip 工具栏出现时，点击 "Chat" 按钮**
3. **AI 会处理文本并返回回复**

### 高级功能
- **连续对话**: 在重置之前，所有对话都会保持上下文
- **快捷键**:
  - `Shift + 点击`: 强制复制模式
  - `Option + 点击`: 切换替换/追加模式
- **重置对话**: 点击 "Reset" 按钮清除对话历史

## 🔍 故障排除

### 常见问题

#### 1. 插件图标不可点击
- **检查 API 密钥**：确保已正确设置 TuZi API 密钥
- **重启 PopClip**：完全退出并重新启动 PopClip
- **检查网络**：确保网络连接正常

#### 2. "未签署的扩展" 警告
- **这是正常现象**：第三方扩展都会显示此警告
- **安全说明**：本扩展代码完全开源，可放心使用
- **解决方法**：点击 "Install Anyway" 继续安装

#### 3. API 请求失败
- **检查 API 密钥**：确保密钥正确且有效
- **检查账户余额**：确保 TuZi 账户有足够额度
- **网络问题**：确保能访问 api.tu-zi.com

#### 4. 对话历史丢失
- **自动重置**：检查是否超过了设置的重置时间
- **手动重置**：确认是否意外点击了重置按钮

### 调试方法

#### 启用调试输出
```bash
# 在终端中运行
defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES
```

#### 查看调试日志
1. 打开 "Console" 应用
2. 搜索 "PopClip" 和 "Extension"
3. 查看详细的运行日志

## 📊 支持的 AI 模型

| 模型名称 | 显示名称 | 特点 |
|---------|---------|------|
| claude-sonnet-4-20250514 | Claude 4 (推荐) | 最新最强大的模型 |
| claude-3-haiku-20240307 | Claude 3 Haiku | 快速响应 |
| claude-3-opus-20240229 | Claude 3 Opus | 高质量输出 |
| o3-mini | O3 Mini | 轻量级模型 |
| gpt-4o-mini | GPT-4o Mini | OpenAI 轻量版 |
| gpt-4o | GPT-4o | OpenAI 标准版 |
| gpt-4-all | GPT-4 All | GPT-4 完整版 |
| gemini-2.5-pro-preview-06-05 | Gemini 2.5 Pro | Google 最新模型 |
| deepseek-v3 | DeepSeek V3 | 国产优秀模型 |

## 🆘 获取帮助

如果遇到问题：

1. **检查本指南**：大多数问题都能在故障排除部分找到解决方案
2. **查看日志**：启用调试输出查看详细错误信息
3. **重新安装**：删除扩展后重新安装
4. **联系支持**：提供详细的错误信息和系统配置

## 🔄 更新日志

### v1.0.0 (当前版本)
- ✅ 支持 9 个主流 AI 模型
- ✅ 完整的对话历史管理
- ✅ 多种响应处理模式
- ✅ 自动重置功能
- ✅ 快捷键支持
- ✅ 完整的错误处理

---

**享受与 AI 的智能对话体验！** 🤖✨ 