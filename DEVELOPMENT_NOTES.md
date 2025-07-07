# PopClip 插件开发经验文档

## 🚨 重要经验教训

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