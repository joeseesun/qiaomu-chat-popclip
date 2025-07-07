# 乔木AI助手 PopClip 扩展

一个强大的 PopClip 扩展，支持多种 AI 服务商和模型的智能对话助手。

## 🎯 推荐使用

### ⭐ 推荐版本：QiaoMuAI-CN.popclipext

**🚀 一键安装，开箱即用**：
- 下载 `QiaoMuAI-CN.popclipext` 文件夹
- 双击安装到PopClip
- 配置API密钥即可使用

**🌐 全API支持**：
- 支持火山引擎API（豆包模型）
- 支持DeepSeek API（DeepSeek V3）
- 支持兔子API（Claude 4, GPT-4o等）
- 支持OpenRouter API（聚合多家模型）
- 兼容所有OpenAI格式API

**🎨 自定义功能**：
- 支持自定义Prompt（通过修改扩写、翻译、解释的提示词实现）
- 四大功能独立控制开关
- 灵活的响应模式配置
- 注：无法修改图标，如需自定义图标请下载源码修改

### 🛠️ 开发者选项

**源码定制**：
- 下载完整源码
- 使用Claude Code或Cursor进行修改
- 完全自定义功能和界面
- 适合有开发需求的用户

## 功能特点

### 🌐 多服务商支持
- **可配置 API 基础地址** - 兼容任何 OpenAI 格式的 API
- **默认支持 TuZi API** - `https://api.tu-zi.com/v1` - [点击注册](https://api.tu-zi.com/register?aff=yyaz)
- **兼容其他服务商**：
  - DeepSeek: `https://api.deepseek.com/v1`
  - OpenAI: `https://api.openai.com/v1`
  - 火山引擎：`https://ark.cn-beijing.volces.com/api/v3/`
  - 其他兼容 OpenAI 格式的 API 服务

### 🤖 多模型支持
- **自定义模型** - 支持输入任意模型名称，优先级最高
- **Claude 4**（推荐）- 最新最强大的模型
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
   - 双击 `QiaoMuChat-CN.popclipext` 文件夹
   - PopClip 会自动识别并安装插件

3. **配置 API**
   - 在 PopClip 设置中找到 "乔木智写"
   - 配置 API 基础地址（默认为 TuZi API）
   - 输入对应服务的 API 密钥
   - 选择默认使用的 AI 模型
   - **🎯 推荐使用TuZi API**: [点击注册](https://api.tu-zi.com/register?aff=yyaz) - 新用户免费额度

## 使用方法

1. **选择文本** - 在任何应用中选择要处理的文本
2. **点击图标** - 在 PopClip 弹出菜单中点击乔木智写图标
3. **获取回复** - AI 会分析文本并提供智能回复
4. **选择模式**：
   - 普通点击：根据设置的默认模式（默认为追加模式）
   - Shift + 点击：强制复制到剪贴板
   - Option + 点击：强制替换选中文本
   - Command + 点击：强制追加到原文本

## 配置选项

### API 设置
- **API 基础地址**: 配置 AI 服务的基础 URL
- **API 密钥**: 你的 API 密钥
- **自定义模型名称**: 输入自定义模型名（可选，优先级最高）
- **AI 模型**: 选择默认使用的 AI 模型（当未填写自定义模型时使用）
- **响应模式**: 设置默认的文本处理方式
- **系统提示**: 自定义 AI 的行为和风格

### 支持的服务商配置

#### TuZi API（默认推荐）
- **基础地址**: `https://api.tu-zi.com/v1`
- **支持模型**: Claude 4, Claude 3 系列, GPT-4o 系列等
- **🎯 注册地址**: [点击注册TuZi API](https://api.tu-zi.com/register?aff=yyaz) - 新用户免费额度

#### DeepSeek API
- **基础地址**: `https://api.deepseek.com/v1`
- **支持模型**: DeepSeek V3, DeepSeek Chat 等
- **获取 API 密钥**: [DeepSeek 官网](https://platform.deepseek.com/)

#### OpenAI API
- **基础地址**: `https://api.openai.com/v1`
- **支持模型**: GPT-4o, GPT-4o Mini, O3 Mini 等
- **获取 API 密钥**: [OpenAI 官网](https://platform.openai.com/)

#### 火山引擎 API
- **基础地址**: `https://ark.cn-beijing.volces.com/api/v3/`
- **支持模型**: 豆包系列模型等
- **获取 API 密钥**: [火山引擎官网](https://console.volcengine.com/)

#### Google Gemini API
- **基础地址**: `https://generativelanguage.googleapis.com/v1beta`
- **支持模型**: Gemini 2.5 Pro, Gemini 1.5 Pro等
- **获取 API 密钥**: [Google AI Studio](https://aistudio.google.com/)

#### OpenRouter API
- **基础地址**: `https://openrouter.ai/api/v1/`
- **支持模型**: 聚合多家AI模型，包括Claude、GPT、Gemini等
- **获取 API 密钥**: [OpenRouter官网](https://openrouter.ai/)
- **特点**: 一个API密钥访问多家AI模型，支持按需付费

#### 其他兼容服务
任何兼容 OpenAI API 格式的服务都可以使用，只需：
1. 设置正确的基础地址
2. 输入对应的 API 密钥
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
   - 检查是否正确配置了 API 基础地址和 API 密钥
   - 确认网络连接正常

2. **请求失败**
   - 验证 API 密钥是否有效
   - 检查 API 配额是否充足
   - 确认基础地址格式正确（必须以 http:// 或 https:// 开头）

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

### v2.1.0
- 🆕 添加自定义模型名称输入框
- 🆕 支持任意模型名称（优先级高于预设模型）
- 🆕 适配新发布的模型和特殊模型变体
- 🗑️ 移除自动重置功能（简化配置）
- 📝 完善文档说明和使用示例

### v2.0.0
- 🆕 添加可配置的 API 基础地址
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

## 👨‍💻 关于作者

### 🔥 关注公众号
获取更多AI工具和技术分享

![向阳乔木推荐看](https://newimg.t5t6.com/1751870053371-c2bf9308-2e52-4a15-81b4-6c7490b551cf.jpg)

**向阳乔木推荐看** - 专注AI工具分享与技术交流

### ☕ 支持作者
如果这个工具对您有帮助，欢迎打赏支持！

![打赏二维码](https://newimg.t5t6.com/1751870053373-97dc7339-5191-4dde-b891-bf4fb4fe8118.png)

您的支持是我持续开发和优化工具的动力！

## 💬 联系方式

- **微信**: vista8
- **X (Twitter)**: vista8  
- **公众号**: 向阳乔木推荐看
- **GitHub**: 欢迎提交Issue和PR

如有问题或建议，请通过以上方式联系或提交Issue。 