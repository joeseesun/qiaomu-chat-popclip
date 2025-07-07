# PopClip 插件开发经验文档

## 🚨 重要经验教训

### 0. 超时和Token数配置优化 🎛️

**功能描述**：
基于主流AI模型的实际Token限制和用户使用场景，添加可配置的超时时间和最大Token数选项。

**主要模型Token限制参考**：
- **Claude 4 Sonnet**: 8,192 tokens 输出
- **GPT-4o/GPT-4 Turbo**: 4,096 tokens 输出  
- **DeepSeek V3**: 8,192 tokens 输出
- **Qwen 2.5**: 8,192 tokens 输出
- **智谱 GLM-4**: 8,192 tokens 输出
- **百川 Baichuan**: 8,192 tokens 输出

**超时时间配置**：
```json
{
  "identifier": "requestTimeout",
  "label": "请求超时时间",
  "type": "multiple",
  "values": ["15", "20", "30", "40", "60", "120", "240", "360"],
  "valueLabels": ["15秒（快速）", "20秒（标准）", "30秒（稳定）", "40秒（耐心）", "60秒（推荐）", "120秒（长文本）", "240秒（复杂任务）", "360秒（超长任务）"],
  "defaultValue": "60"
}
```

**Token数配置**：
```json
{
  "identifier": "maxTokens",
  "label": "最大生成Token数",
  "type": "multiple",
  "values": ["512", "1024", "2048", "4096", "8192", "16384", "65536", "131072", "204800"],
  "valueLabels": ["512（简短）", "1024（标准）", "2048（详细）", "4096（完整）", "8192（丰富）", "16K（长文本）", "64K（超长文本）", "128K（文档级）", "200K（书籍级）"],
  "defaultValue": "2048"
}
```

**实现代码**：
```javascript
// 获取最大Token数
var maxTokensStr = popclip.options.maxTokens || "2048";
var maxTokens = parseInt(maxTokensStr);
if (isNaN(maxTokens) || maxTokens < 512) {
    maxTokens = 2048;  // 默认值
}

// 在请求数据中使用
var requestData = {
    model: selectedModel,
    messages: messages,
    max_tokens: maxTokens,
    temperature: 0.7
};
```

**使用场景**：

**超时时间选择**：
- **15-40秒**：快速任务，简单问答
- **60秒（推荐）**：平衡效率和成功率
- **120秒**：长文本处理
- **240-360秒**：复杂任务、大文档处理

**Token数选择**：
- **512 (简短)**：快速回复、简单问答
- **1024 (标准)**：日常对话、基础翻译
- **2048 (详细)**：文本扩写、详细解释（默认）
- **4096 (完整)**：长文档处理、复杂分析
- **8192 (丰富)**：详细创作、深度分析
- **16K (长文本)**：长文章、报告生成
- **64K (超长文本)**：书籍章节、长篇内容
- **128K (文档级)**：完整文档处理
- **200K (书籍级)**：书籍级内容创作

### 0.1. PopClip 不支持 require() 共享函数 ❌

**问题描述**：
PopClip 不支持使用 `require()` 来加载共享 JavaScript 文件，每个 `.js` 文件必须是完全独立的。

**❌ 错误的方式**：
```javascript
// shared-utils.js
function getModelDisplayName(modelId) {
    // 共享函数代码
}

// qiaomu-chat.js
var utils = require("./shared-utils");  // ❌ 不支持
var modelName = utils.getModelDisplayName(modelId);
```

**✅ 正确的方式**：
```javascript
// 每个文件都要包含完整的函数定义
// qiaomu-chat.js
function getModelDisplayName(modelId) {
    var modelNames = {
        "claude-sonnet-4-20250514": "Claude 4",
        // ... 完整的映射表
    };
    return modelNames[modelId] || modelId;
}

// qiaomu-expand.js
function getModelDisplayName(modelId) {
    // 相同的函数定义必须复制到每个文件
}
```

**影响**：
- 无法创建 `shared-utils.js` 等共享工具文件
- 通用函数必须在每个文件中重复定义
- 代码维护成本增加，但这是 PopClip 的限制

**最佳实践**：
- 将通用函数直接复制到每个需要的文件中
- 保持函数定义的一致性
- 使用注释标记共享函数，便于维护

### 1. 自定义模型名称功能 (v2.1.0) ✨

**功能描述**：
允许用户输入自定义模型名称，优先级高于预设模型下拉菜单。适用于新发布的模型、特殊模型变体、本地部署模型等场景。

**实现方式**：
```javascript
// 优先使用自定义模型名称
var selectedModel;
var customModel = popclip.options.customModel ? popclip.options.customModel.trim() : "";

if (customModel && customModel.length > 0) {
    selectedModel = customModel;
    print("QiaoMu Chat: Using custom model: " + selectedModel);
} else {
    selectedModel = popclip.options.model || "claude-sonnet-4-20250514";
    print("QiaoMu Chat: Using preset model: " + selectedModel);
}
```

**配置文件更新**：
```json
{
  "options": [
    {
      "identifier": "customModel",
      "type": "string",
      "label": "Custom Model Name (Optional)",
      "description": "Enter a custom model name. If provided, this will override the model selection below.",
      "defaultValue": ""
    },
    {
      "identifier": "model",
      "type": "multiple",
      "label": "AI Model",
      "description": "Select the AI model to use (ignored if custom model is specified above)",
      // ... 其他配置
    }
  ]
}
```

**使用场景**：
- 新发布的模型：`gpt-4o-2024-11-20`, `claude-3-5-sonnet-20241022`
- 服务商特殊变体：`deepseek-chat`, `qwen-max`, `yi-34b-chat`
- 本地部署模型：任意自定义名称

### 2. Copy 模式的错误提示问题 ⚠️

**问题描述**：
当插件设置为 copy 模式（只复制到剪贴板，不粘贴）时，PopClip 显示错误的 ❌ 图标，即使复制功能正常工作。

**根本原因**：
- 当配置中有 `"after": "paste-result"` 时，PopClip 期望脚本返回一个可粘贴的值
- 如果返回 `null`、`undefined` 或空字符串，PopClip 认为这是错误
- 即使 `popclip.copyText()` 成功执行，错误的返回值仍会导致错误提示

**❌ 错误的解决方案**：
```javascript
// 这些方法都会导致错误提示
return null;
return "";
return undefined;
popclip.showText("已复制"); return "";
```

**✅ 正确的解决方案**：
```javascript
// 方案1：移除 "after": "paste-result"，使用主动控制
if (responseMode === "copy") {
    popclip.copyText(content);
    popclip.showSuccess();
    return;  // 不返回任何值
}

// 方案2：所有模式都使用 popclip.pasteText() 主动控制
if (responseMode === "copy") {
    popclip.copyText(content);
    popclip.showSuccess();
    return;  // copy模式不粘贴
} else {
    popclip.pasteText(content);  // 其他模式主动粘贴
    return;
}
```

**配置文件**：
```json
{
  "actions": [
    {
      "title": "Chat",
      "identifier": "chat",
      "javascriptFile": "chat.js",
      "requirements": ["text"]
      // 不要添加 "after": "paste-result"
    }
  ]
}
```

**关键点**：
1. **永远不要在 copy 模式下返回字符串值**
2. **使用 `popclip.pasteText()` 主动控制粘贴行为**
3. **移除 `"after": "paste-result"` 配置**
4. **copy 模式只调用 `popclip.copyText()` 和 `popclip.showSuccess()`**

---

## 🛠️ PopClip 开发最佳实践

### 2. 脚本格式规范

**正确的脚本格式**：
```javascript
// ✅ 正确：顶层代码，不需要函数包装
print("Starting action");
var result = await someAsyncOperation();
return result;
```

**❌ 错误的格式**：
```javascript
// ❌ 错误：不要使用立即执行函数
(async function() {
    // 代码
})();

// ❌ 错误：不要使用 exports
exports.action = function() {
    // 代码
};
```

### 3. 网络请求配置

**必需的配置**：
```json
{
  "entitlements": ["network"],  // 必须包含网络权限
  "popclipVersion": 4151        // 确保版本兼容性
}
```

**HTTP 请求示例**：
```javascript
var axios = require("axios");  // PopClip 内置 axios
var response = await axios.post(url, data, {
    headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
    },
    timeout: 30000
});
```

### 4. 错误处理

**设置错误**（触发设置界面）：
```javascript
throw new Error("Settings error: missing API key");
```

**一般错误**：
```javascript
throw new Error("Network request failed");
```

### 5. 变量持久化

**正确的持久化方式**：
```javascript
// 检查变量是否已定义
if (typeof messages === 'undefined') {
    var messages = [];
}

// 使用变量
messages.push(newMessage);
```

---

## 🐛 常见问题排查

### 问题1：插件不显示
- 检查 `Config.json` 格式是否正确
- 确认 `popclipVersion` 兼容性
- 验证 `actions` 配置完整

### 问题2：网络请求失败
- 确认 `entitlements` 包含 `"network"`
- 检查 API URL 格式
- 验证 API Key 有效性

### 问题3：JavaScript 错误
- 使用 `print()` 添加调试日志
- 检查异步操作的 await 使用
- 确认变量作用域和持久化

### 问题4：响应模式问题
- **Copy 模式**：只复制，不返回值
- **Replace 模式**：使用 `popclip.pasteText()` 替换
- **Append 模式**：使用 `popclip.pasteText()` 追加

---

## 📝 开发检查清单

### 配置文件 (Config.json)
- [ ] JSON 格式正确
- [ ] 包含必要的 `entitlements`
- [ ] `actions` 配置完整
- [ ] 不包含 `"after": "paste-result"`（如果有 copy 模式）

### JavaScript 文件
- [ ] 使用顶层代码格式
- [ ] 正确处理异步操作
- [ ] 变量持久化正确实现
- [ ] 错误处理完善

### 响应处理
- [ ] Copy 模式不返回值
- [ ] 使用 `popclip.pasteText()` 主动控制粘贴
- [ ] 错误提示正确显示

---

## 🔄 版本更新记录

### v2.1.0 经验总结
- **新功能**：自定义模型名称输入框
- **优先级逻辑**：自定义模型 > 预设模型下拉菜单
- **灵活性提升**：支持任意模型名称，适配新发布模型
- **配置简化**：移除Auto Reset功能，减少配置复杂度
- **国际化**：创建中文版插件（QiaoMuChat-CN.popclipext）
- **向后兼容**：不影响现有配置和使用方式

### v2.0.0 经验总结
- **重大发现**：Copy 模式的错误提示问题
- **解决方案**：移除 `"after": "paste-result"`，使用主动控制
- **新功能**：可配置 API Base URL
- **改进**：更好的错误处理和调试日志

---

**⚠️ 重要提醒**：
每次遇到 copy 模式显示错误图标的问题时，请参考本文档第1条经验教训！

## 最新更新 (v3.0.2)

### 多功能选择控制 - 独立布尔开关方案
用户希望能够同时开启多个功能（如chat+expand），原来的单选方案无法满足需求。

#### 问题分析
1. **PopClip限制**：`option-identifier=value`语法只支持单个值匹配
2. **多选选项问题**：`multiple`类型选项返回数组，无法直接用于requirements
3. **JavaScript模块限制**：需要`dynamic`权限，与`network`权限冲突

#### 解决方案：独立布尔开关
改为为每个功能创建独立的布尔选项：

1. **配置设计**：
   ```json
   {
     "identifier": "enableChat",
     "type": "boolean", 
     "label": "启用智能对话",
     "defaultValue": true
   }
   ```

2. **Requirements配置**：
   ```json
   {
     "requirements": ["text", "option-enableChat=1"]
   }
   ```

3. **优势**：
   - 支持任意功能组合（chat+expand、translate+explain等）
   - 用户界面清晰，每个功能独立控制
   - 兼容PopClip的requirements语法
   - 不需要额外的权限

4. **默认配置**：
   - 智能对话：开启（最常用）
   - 文本扩写：开启（常用）
   - 翻译转换：关闭（避免图标过多）
   - 内容解释：关闭（避免图标过多）

#### 用户使用场景
- **轻量用户**：只开启"智能对话"
- **写作用户**：开启"智能对话"+"文本扩写"
- **翻译用户**：开启"翻译转换"+"智能对话"
- **学习用户**：开启"内容解释"+"智能对话"
- **全功能用户**：全部开启

#### 测试方法
1. 安装插件，进入PopClip设置
2. 找到"乔木AI助手"扩展设置
3. 尝试不同的功能组合：
   - 只开启"启用智能对话"
   - 同时开启"启用智能对话"和"启用文本扩写"
   - 开启所有功能
4. 选择文本测试，确认只显示开启的功能图标

## 最新更新 (v3.0.1)

### 功能选择控制
现在可以通过配置选项控制哪些action图标显示：

1. **配置原理**：
   - 使用PopClip的`option-identifier=value`语法
   - 在每个action的`requirements`数组中添加条件
   - 例如：`"option-enabledFeatures=chat"`

2. **配置文件修改**：
   ```json
   {
     "requirements": ["text", "option-enabledFeatures=chat"]
   }
   ```

3. **用户使用**：
   - 在PopClip设置中找到"启用功能"选项
   - 选择要显示的功能：智能对话、文本扩写、翻译转换、内容解释
   - 只有选中的功能会显示对应的图标

4. **技术细节**：
   - PopClip会检查`enabledFeatures`选项的值
   - 只有当值匹配时，对应的action才会显示
   - 支持多选，但每个action只检查自己对应的值

### 测试方法
1. 安装插件后，进入PopClip设置
2. 找到"乔木AI助手"扩展设置
3. 修改"启用功能"选项，选择不同的功能
4. 选择文本测试，确认只显示选中的功能图标

---

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

---

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