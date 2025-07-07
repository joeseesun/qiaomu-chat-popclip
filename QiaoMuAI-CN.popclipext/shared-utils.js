// 乔木AI助手 - 共享工具函数
// 提供所有功能模块的公共逻辑

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

// 确定使用的模型（优先自定义模型）
function getSelectedModel() {
	var customModel = popclip.options.customModel ? popclip.options.customModel.trim() : "";
	
	if (customModel && customModel.length > 0) {
		print("乔木AI：使用自定义模型：" + customModel);
		return customModel;
	} else {
		var selectedModel = popclip.options.model || "claude-sonnet-4-20250514";
		print("乔木AI：使用预设模型：" + selectedModel);
		return selectedModel;
	}
}

// 获取模型显示名称（包含自定义模型）
function getDisplayModelName() {
	var customModel = popclip.options.customModel ? popclip.options.customModel.trim() : "";
	if (customModel && customModel.length > 0) {
		return customModel;
	} else {
		return getModelDisplayName(popclip.options.model || "claude-sonnet-4-20250514");
	}
}

// 验证和准备API配置
function prepareApiConfig() {
	// 检查API密钥
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
	print("乔木AI：使用API端点：" + apiEndpoint);

	return {
		apikey: popclip.options.apikey,
		endpoint: apiEndpoint
	};
}

// 发送API请求
async function sendApiRequest(messages, functionName) {
	var config = prepareApiConfig();
	var selectedModel = getSelectedModel();
	var modelName = getDisplayModelName();

	// 显示处理指示器
	popclip.showText("正在使用 " + modelName + " " + functionName + "中...");

	// 准备请求数据
	var requestData = {
		model: selectedModel,
		messages: messages,
		max_tokens: 1000,
		temperature: 0.7
	};

	// 使用axios进行HTTP请求
	var axios = require("axios");

	try {
		var response = await axios.post(config.endpoint, requestData, {
			headers: {
				"Authorization": "Bearer " + config.apikey,
				"Content-Type": "application/json"
			},
			timeout: 30000
		});

		var data = response.data;
		var assistantMessage = data.choices[0].message;
		
		print("乔木AI：已收到来自 " + modelName + " 的" + functionName + "回复");
		return assistantMessage.content.trim();
		
	} catch (error) {
		print("乔木AI：API请求失败：" + error.message);
		throw new Error("API请求失败：" + error.message);
	}
}

// 处理响应模式
function handleResponse(content) {
	// 确定响应模式 - 修饰键优先于设置
	var responseMode = popclip.options.textMode || "copy";

	// 修饰键覆盖（简化逻辑）
	if (popclip.modifiers.shift) {
		responseMode = "copy";  // Shift = 强制复制模式
	} else if (popclip.modifiers.option) {
		responseMode = "replace";  // Option = 强制替换模式
	}

	print("乔木AI：使用响应模式：" + responseMode);

	// 根据确定的模式处理响应
	if (responseMode === "copy") {
		// 仅将AI回复复制到剪贴板
		popclip.copyText(content);
		popclip.showSuccess();
		return;
	} else if (responseMode === "replace") {
		// 仅用AI回复替换选中的文本
		popclip.pasteText(content);
		return;
	} else {
		// 追加模式：在原文本后添加AI回复
		var appendedText = popclip.input.text.trim() + "\n\n" + content;
		popclip.pasteText(appendedText);
		return;
	}
}

// 获取自定义提示词
function getCustomPrompts() {
	var customPromptsStr = popclip.options.customPrompts ? popclip.options.customPrompts.trim() : "";
	
	if (customPromptsStr && customPromptsStr.length > 0) {
		try {
			return JSON.parse(customPromptsStr);
		} catch (error) {
			print("乔木AI：自定义提示词JSON解析失败：" + error.message);
			return {};
		}
	}
	
	return {};
}

// 预设提示词
var defaultPrompts = {
	expand: "请将以下文本进行扩写，保持原意的同时增加细节和深度，使内容更加丰富和完整：\n\n",
	translate: "请将以下文本翻译成英文，如果原文是英文则翻译成中文，保持原意和语调：\n\n",
	explain: "请详细解释以下内容，用简单易懂的语言，帮助读者更好地理解：\n\n",
	chat: "请基于以下内容进行智能对话和回复：\n\n"
};

// 获取指定功能的提示词
function getPrompt(functionType) {
	var customPrompts = getCustomPrompts();
	
	// 优先使用自定义提示词
	if (customPrompts[functionType]) {
		return customPrompts[functionType] + "\n\n";
	}
	
	// 使用默认提示词
	return defaultPrompts[functionType] || defaultPrompts.chat;
} 