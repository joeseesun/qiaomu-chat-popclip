// 乔木智写 PopClip 扩展
// 基于 PopClip 官方 JavaScript 动作规范

// 消息历史存储（跨调用持久化）
if (typeof messages === 'undefined') {
	var messages = [];
}

// 最后聊天时间戳
if (typeof lastChat === 'undefined') {
	var lastChat = new Date();
}

// 重置对话历史
function reset() {
	print("乔木智写历史记录");
	messages.length = 0;
	popclip.showText("写作历史已重置", { preview: "✅ 重置完成" });
}

// 获取用户友好的模型显示名称
function getModelDisplayName(modelId) {
	var modelNames = {
		"claude-sonnet-4-20250514": "Claude 4",
		"claude-3-haiku-20240307": "Claude 3 Haiku",
		"claude-3-opus-20240229": "Claude 3 Opus",
		"o3-mini": "O3 Mini",
		"gpt-4o-mini": "GPT-4o Mini",
		"gpt-4o": "GPT-4o",
		"gpt-4-all": "GPT-4 All",
		"gemini-2.5-pro-preview-06-05": "Gemini 2.5 Pro",
		"deepseek-v3": "DeepSeek V3"
	};
	return modelNames[modelId] || modelId;
}

print("乔木智写：开始写作动作");

// 检查是否提供了API密钥
if (!popclip.options.apikey || popclip.options.apikey.trim() === "") {
	throw new Error("设置错误：缺少API密钥");
}

// 检查并准备API基础URL
var apiBaseUrl = popclip.options.apiBaseUrl || "https://api.tu-zi.com/v1";
apiBaseUrl = apiBaseUrl.trim();

// 移除末尾的斜杠（如果存在）
if (apiBaseUrl.endsWith("/")) {
	apiBaseUrl = apiBaseUrl.slice(0, -1);
}

// 验证URL格式
if (!apiBaseUrl.startsWith("http://") && !apiBaseUrl.startsWith("https://")) {
	throw new Error("设置错误：API基础URL必须以http://或https://开头");
}

// 构建完整的API端点
var apiEndpoint = apiBaseUrl + "/chat/completions";
print("乔木智写：使用API端点：" + apiEndpoint);

// 如果这是对话开始，添加系统消息
if (messages.length === 0) {
	var systemMessage = popclip.options.systemMessage ? popclip.options.systemMessage.trim() : "";
	if (systemMessage) {
		messages.push({ role: "system", content: systemMessage });
		print("乔木智写：已添加系统消息");
	}
}

// 将用户消息添加到历史记录
messages.push({ role: "user", content: popclip.input.text.trim() });
print("乔木智写：已添加用户消息，总消息数：" + messages.length);

// 确定使用哪个模型：自定义模型优先
var selectedModel;
var customModel = popclip.options.customModel ? popclip.options.customModel.trim() : "";

if (customModel && customModel.length > 0) {
	selectedModel = customModel;
	print("乔木智写：使用自定义模型：" + selectedModel);
} else {
	selectedModel = popclip.options.model || "claude-sonnet-4-20250514";
	print("乔木智写：使用预设模型：" + selectedModel);
}

// 显示处理指示器和当前模型
var modelName = customModel && customModel.length > 0 ? customModel : getModelDisplayName(selectedModel);
popclip.showText("正在使用 " + modelName + " 处理中...");

// 准备请求数据
var requestData = {
	model: selectedModel,
	messages: messages,
	max_tokens: 1000,
	temperature: 0.7
};

// 使用axios进行HTTP请求（PopClip内置库）
var axios = require("axios");

// 发起API请求（异步操作 - PopClip自动处理异步）
var response = await axios.post(apiEndpoint, requestData, {
	headers: {
		"Authorization": "Bearer " + popclip.options.apikey,
		"Content-Type": "application/json"
	},
	timeout: 30000
});

var data = response.data;
var assistantMessage = data.choices[0].message;
messages.push(assistantMessage);
lastChat = new Date();

print("乔木智写：已收到来自 " + modelName + " 的回复");

// 确定响应模式 - 修饰键优先于设置
var responseMode = popclip.options.textMode || "copy";

// 修饰键覆盖（简化逻辑）
if (popclip.modifiers.shift) {
	responseMode = "copy";  // Shift = 强制复制模式
} else if (popclip.modifiers.option) {
	responseMode = "replace";  // Option = 强制替换模式
}

print("乔木智写：使用响应模式：" + responseMode);

// 根据确定的模式处理响应
if (responseMode === "copy") {
	// 仅将AI回复复制到剪贴板
	popclip.copyText(assistantMessage.content.trim());
	popclip.showSuccess();
	// 不返回任何内容 - 让PopClip处理成功显示
	return;
} else if (responseMode === "replace") {
	// 仅用AI回复替换选中的文本
	popclip.pasteText(assistantMessage.content.trim());
	return;
} else {
	// 追加模式：在原文本后添加AI回复
	var appendedText = popclip.input.text.trim() + "\n\n" + assistantMessage.content.trim();
	popclip.pasteText(appendedText);
	return;
}

// 不需要exports，PopClip通过名称查找全局函数 