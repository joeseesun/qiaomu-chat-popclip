# QiaoMu AI Assistant PopClip Extension

一个强大的 PopClip 扩展，支持多种 AI 服务商和模型的智能对话助手。

> 🇨🇳 **中文用户**: 请使用 [乔木AI助手中文版](README-AI-CN.md) 和 `QiaoMuAI-CN.popclipext` 插件文件夹。
> 
> 🇺🇸 **English Users**: Use this README and the `QiaoMuChat.popclipext` plugin folder.

## 🎯 Recommended Usage

### ⭐ Recommended Version: QiaoMuAI-CN.popclipext

**🚀 One-Click Install, Ready to Use**:
- Download `QiaoMuAI-CN.popclipext` folder
- Double-click to install to PopClip
- Configure API key and start using

**🌐 Full API Support**:
- Support Volcano Engine API (Doubao models)
- Support DeepSeek API (DeepSeek V3)
- Support TuZi API (Claude 4, GPT-4o, etc.)
- Support OpenRouter API (aggregated models)
- Compatible with all OpenAI format APIs

**🎨 Customization Features**:
- Support custom Prompts (via modifying expand, translate, explain prompts)
- Four independent function toggles
- Flexible response mode configuration
- Note: Cannot modify icons, download source code for custom icons

### 🛠️ Developer Options

**Source Code Customization**:
- Download complete source code
- Modify with Claude Code or Cursor
- Fully customize functions and interface
- Suitable for users with development needs

## 功能特点

### 🌐 多服务商支持
- **可配置 API Base URL** - 兼容任何 OpenAI 格式的 API
- **默认支持 TuZi API** - `https://api.tu-zi.com/v1` - [Register here](https://api.tu-zi.com/register?aff=yyaz)
- **兼容其他服务商**：
  - DeepSeek: `https://api.deepseek.com/v1`
  - OpenAI: `https://api.openai.com/v1`
  - 火山引擎：`https://ark.cn-beijing.volces.com/api/v3/`
  - 其他兼容 OpenAI 格式的 API 服务

### 🤖 多模型支持
- **自定义模型** - 支持输入任意模型名称，优先级最高
- **Claude 4** (默认) - 最新最强大的模型
- **Claude 3 系列** - Haiku, Opus
- **GPT-4o 系列** - Mini, 标准版, All
- **O3 Mini** - OpenAI 最新模型
- **Gemini 2.5 Pro** - Google 最新模型
- **DeepSeek V3** - 国产优秀模型

### 💬 智能对话
- **持续对话** - 自动保持对话上下文
- **多种响应模式**：
  - 复制到剪贴板（默认）
  - 追加到当前文本
  - 替换选中文本

### ⚡ 便捷操作
- **快捷键支持**：
  - 普通点击：根据设置的默认模式（默认为追加模式）
  - Shift + 点击：强制复制模式
  - Option + 点击：强制替换模式
  - Command + 点击：强制追加模式
- **一键重置** - 清除对话历史

## 安装方法

1. **下载插件**
   ```bash
   # 克隆或下载此仓库
   git clone [repository-url]
   ```

2. **安装插件**
   - 双击 `QiaoMuChat.popclipext` 文件夹
   - PopClip 会自动识别并安装插件

3. **配置 API**
   - 在 PopClip 设置中找到 "QiaoMu Chat"
   - 配置 API Base URL（默认为 TuZi API）
   - 输入对应服务的 API Key
   - 选择默认使用的 AI 模型
   - **🎯 Recommended**: [Register TuZi API](https://api.tu-zi.com/register?aff=yyaz) - Free credits for new users

## 使用方法

1. **选择文本** - 在任何应用中选择要处理的文本
2. **点击图标** - 在 PopClip 弹出菜单中点击 QiaoMu Chat 图标
3. **获取回复** - AI 会分析文本并提供智能回复
4. **选择模式**：
   - 普通点击：根据设置的默认模式（默认为追加模式）
   - Shift + 点击：强制复制到剪贴板
   - Option + 点击：强制替换选中文本
   - Command + 点击：强制追加到原文本

## 配置选项

### API 设置
- **API Base URL**: 配置 AI 服务的基础 URL
- **API Key**: 你的 API 密钥
- **自定义模型名称**: 输入自定义模型名（可选，优先级最高）
- **模型选择**: 选择默认使用的 AI 模型（当未填写自定义模型时使用）
- **响应模式**: 设置默认的文本处理方式
- **系统提示**: 自定义 AI 的行为和风格

### 支持的服务商配置

#### TuZi API (默认推荐)
- **Base URL**: `https://api.tu-zi.com/v1`
- **支持模型**: Claude 4, Claude 3 系列, GPT-4o 系列等
- **🎯 Register**: [Click to register TuZi API](https://api.tu-zi.com/register?aff=yyaz) - Free credits for new users

#### DeepSeek API
- **Base URL**: `https://api.deepseek.com/v1`
- **支持模型**: DeepSeek V3, DeepSeek Chat 等
- **获取 API Key**: [DeepSeek 官网](https://platform.deepseek.com/)

#### OpenAI API
- **Base URL**: `https://api.openai.com/v1`
- **支持模型**: GPT-4o, GPT-4o Mini, O3 Mini 等
- **获取 API Key**: [OpenAI 官网](https://platform.openai.com/)

#### 火山引擎 API
- **Base URL**: `https://ark.cn-beijing.volces.com/api/v3/`
- **支持模型**: 豆包系列模型等
- **获取 API Key**: [火山引擎官网](https://console.volcengine.com/)

#### Google Gemini API
- **Base URL**: `https://generativelanguage.googleapis.com/v1beta`
- **支持模型**: Gemini 2.5 Pro, Gemini 1.5 Pro等
- **获取 API Key**: [Google AI Studio](https://aistudio.google.com/)

#### OpenRouter API
- **Base URL**: `https://openrouter.ai/api/v1/`
- **支持模型**: 聚合多家AI模型，包括Claude、GPT、Gemini等
- **获取 API Key**: [OpenRouter官网](https://openrouter.ai/)
- **特点**: 一个API密钥访问多家AI模型，支持按需付费

#### 其他兼容服务
任何兼容 OpenAI API 格式的服务都可以使用，只需：
1. 设置正确的 Base URL
2. 输入对应的 API Key
3. 选择支持的模型或输入自定义模型名称

#### 自定义模型使用
- **优先级**: 如果填写了自定义模型名称，将忽略下拉菜单的选择
- **适用场景**: 
  - 使用新发布的模型（如 GPT-5, Claude 5 等）
  - 使用服务商的特殊模型变体
  - 使用本地部署的模型
- **示例模型名称**:
  - `gpt-4o-2024-11-20` (OpenAI 最新版本)
  - `claude-3-5-sonnet-20241022` (Anthropic 最新版本)
  - `deepseek-chat` (DeepSeek 通用模型)
  - `qwen-max` (阿里云通义千问)
  - `yi-34b-chat` (01.AI 模型)

### 高级设置
- **温度控制**: 调节 AI 回复的创造性（0.1-1.0）
- **最大长度**: 限制 AI 回复的最大字符数
- **系统提示**: 自定义 AI 的行为和风格

## 故障排除

### 常见问题

1. **插件无法点击**
   - 检查是否正确配置了 API Base URL 和 API Key
   - 确认网络连接正常

2. **请求失败**
   - 验证 API Key 是否有效
   - 检查 API 配额是否充足
   - 确认 Base URL 格式正确（必须以 http:// 或 https:// 开头）

3. **响应慢**
   - 尝试切换到更快的模型（如 Claude 3 Haiku）
   - 检查网络连接状态
   - 考虑切换到其他 API 服务商

### 重置对话
如果对话出现问题，可以：
- 点击重置按钮清除历史记录

## 技术规格

- **PopClip 版本**: 4151+
- **网络权限**: 需要网络访问权限
- **API 兼容性**: 支持 OpenAI API 格式
- **支持系统**: macOS 10.14+

## 更新日志

### v2.1.2
- ✨ 新增功能选择控制：现在可以通过"启用功能"选项控制哪些图标显示
- 🎛️ 支持单独启用/禁用智能对话、文本扩写、翻译转换、内容解释功能
- 🎯 优化用户体验：只显示用户需要的功能按钮
- 📝 完善配置文档说明

### v2.1.1
- 🐛 修复 QiaoMuAI-CN 插件配置文件错误（options.5.defaultValue 类型错误）
- 🐛 修复 QiaoMuAI-CN 插件代码结构问题（重复HTTP请求、执行顺序错误）
- ✅ 重构 qiaomu-chat.js，使用共享工具函数，提高代码可维护性
- 📝 完善错误处理和日志输出

### v2.1.0
- 🆕 添加自定义模型名称输入框
- 🆕 支持任意模型名称（优先级高于预设模型）
- 🆕 适配新发布的模型和特殊模型变体
- 🗑️ 移除自动重置功能（简化配置）
- 📝 完善文档说明和使用示例

### v2.0.0
- 🆕 添加可配置的 API Base URL
- 🆕 支持多种 AI 服务商（TuZi, DeepSeek, OpenAI 等）
- 🆕 兼容任何 OpenAI 格式的 API
- ✅ 修复所有响应模式的显示问题

### v1.0.0
- 首次发布
- 支持 9 种 AI 模型
- 完整的对话历史管理
- 多种响应模式
- 键盘快捷键支持

## 许可证

本项目遵循 MIT 许可证。

## 👨‍💻 About Author

### 🔥 Follow WeChat Official Account
Get more AI tools and technical sharing

![向阳乔木推荐看](https://newimg.t5t6.com/1751870053371-c2bf9308-2e52-4a15-81b4-6c7490b551cf.jpg)

**向阳乔木推荐看** - Focus on AI tools sharing and technical communication

### ☕ Support the Author
If this tool is helpful to you, welcome to tip and support!

![Tip QR Code](https://newimg.t5t6.com/1751870053373-97dc7339-5191-4dde-b891-bf4fb4fe8118.png)

Your support is my motivation to continue developing and optimizing tools!

## 💬 Contact

- **WeChat**: vista8
- **X (Twitter)**: vista8  
- **Official Account**: 向阳乔木推荐看
- **GitHub**: Welcome to submit Issues and PRs

If you have any questions or suggestions, please contact through the above methods or submit an Issue. 