// 乔木AI助手 - 智能对话功能
// 支持持续对话和上下文记忆

// 消息历史存储（跨调用持久化）
if (typeof chatMessages === 'undefined') {
	var chatMessages = [];
}

// 最后聊天时间戳
if (typeof lastChatTime === 'undefined') {
	var lastChatTime = new Date();
}

// 重置对话历史
function reset() {
	print("乔木AI：重置对话历史记录");
	chatMessages.length = 0;
	popclip.showText("对话历史已重置", { preview: "✅ 重置完成" });
}

// 获取用户友好的模型显示名称
function getModelDisplayName(modelId) {
	var modelNames = {
		"claude-sonnet-4-20250514": "Claude 4 Sonnet",
		"claude-sonnet-4-20250514-thinking": "Claude 4 Sonnet Thinking",
		"claude-opus-4-20250514": "Claude 4 Opus",
		"claude-3-haiku-20240307": "Claude 3 Haiku",
		"claude-3-opus-20240229": "Claude 3 Opus",
		"gemini-2.5-pro-preview-06-05": "Gemini 2.5 Pro",
		"o3-mini": "O3 Mini",
		"gpt-4o-mini": "GPT-4o Mini",
		"gpt-4o": "GPT-4o",
		"gpt-4-all": "GPT-4 All",
		"grok-3": "Grok-3",
		"deepseek-v3": "DeepSeek V3"
	};
	return modelNames[modelId] || modelId;
}

// 获取超时时间（秒）
function getTimeoutSeconds() {
	var timeoutStr = popclip.options.requestTimeout || "60";
	var timeout = parseInt(timeoutStr);
	return isNaN(timeout) || timeout < 15 ? 60 : timeout;  // 默认60秒
}

// 优化的错误处理函数
function handleApiError(error) {
	var errorMessage = error.message || "未知错误";
	
	// 超时错误
	if (errorMessage.includes("timeout") || errorMessage.includes("ETIMEDOUT")) {
		return "请求超时，请检查网络连接或增加超时时间";
	}
	
	// 网络连接错误
	if (errorMessage.includes("ECONNREFUSED") || errorMessage.includes("ENOTFOUND")) {
		return "网络连接失败，请检查网络设置";
	}
	
	// HTTP状态码错误
	if (error.response && error.response.status) {
		var status = error.response.status;
		switch (status) {
			case 401:
				return "API密钥无效，请检查设置";
			case 403:
				return "访问被拒绝，请检查API权限";
			case 404:
				return "API端点不存在，请检查基础URL设置";
			case 429:
				return "请求过于频繁，请稍后重试";
			case 500:
				return "服务器内部错误，请稍后重试";
			case 503:
				return "服务暂时不可用，请稍后重试";
			default:
				return "HTTP错误 " + status + "，请稍后重试";
		}
	}
	
	// 其他错误
	return "请求失败：" + errorMessage;
}

print("乔木AI：开始智能对话功能");

try {
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
	print("乔木AI：使用API端点：" + apiEndpoint);

	// 如果这是对话开始，添加系统消息
	if (chatMessages.length === 0) {
		var customPrompt = popclip.options.customChatPrompt ? popclip.options.customChatPrompt.trim() : "";
		
		if (customPrompt) {
			chatMessages.push({ role: "system", content: customPrompt });
			print("乔木AI：已添加自定义系统消息");
		}
	}

	// 添加用户消息到历史记录
	chatMessages.push({ role: "user", content: popclip.input.text.trim() });
	print("乔木AI：已添加用户消息，对话消息总数：" + chatMessages.length);

	// 确定使用哪个模型：自定义模型优先
	var selectedModel;
	var customModel = popclip.options.customModel ? popclip.options.customModel.trim() : "";

	if (customModel && customModel.length > 0) {
		selectedModel = customModel;
		print("乔木AI：使用自定义模型：" + selectedModel);
	} else {
		selectedModel = popclip.options.model || "claude-sonnet-4-20250514";
		print("乔木AI：使用预设模型：" + selectedModel);
	}

	// 获取超时时间
	var timeoutSeconds = getTimeoutSeconds();
	var timeoutMs = timeoutSeconds * 1000;

	// 确定响应模式 - 修饰键优先于设置
	var responseMode = popclip.options.textMode || "append";

	// 修饰键覆盖（完整逻辑）
	if (popclip.modifiers.shift) {
		responseMode = "copy";  // Shift = 强制复制模式
	} else if (popclip.modifiers.option) {
		responseMode = "replace";  // Option = 强制替换模式
	} else if (popclip.modifiers.command) {
		responseMode = "append";  // Command = 强制追加模式
	}

	print("乔木AI：使用响应模式：" + responseMode);

	// 显示处理指示器和当前模型
	var modelName = customModel && customModel.length > 0 ? customModel : getModelDisplayName(selectedModel);
	
	// 根据响应模式显示不同的loading消息
	if (responseMode === "copy") {
		popclip.showText(modelName + " 生成内容...（" + timeoutSeconds + "秒超时）");
	} else if (responseMode === "replace") {
		popclip.showText(modelName + " 替换内容...（" + timeoutSeconds + "秒超时）");
	} else {
		popclip.showText(modelName + " 对话中...（" + timeoutSeconds + "秒超时）");
	}

	// 获取最大Token数
	var maxTokensStr = popclip.options.maxTokens || "2048";
	var maxTokens = parseInt(maxTokensStr);
	if (isNaN(maxTokens) || maxTokens < 512) {
		maxTokens = 2048;  // 默认值
	}

	// 准备请求数据
	var requestData = {
		model: selectedModel,
		messages: chatMessages,
		max_tokens: maxTokens,
		temperature: 0.7
	};

	// 使用axios进行HTTP请求
	var axios = require("axios");

	// 创建请求配置
	var requestConfig = {
		headers: {
			"Authorization": "Bearer " + popclip.options.apikey,
			"Content-Type": "application/json"
		},
		timeout: timeoutMs
	};

	var retryCount = 0;
	var maxRetries = timeoutSeconds >= 15 ? 1 : 0;  // 长超时时间才启用重试
	var response;

	while (retryCount <= maxRetries) {
		try {
			// 如果是重试，显示重试提示
			if (retryCount > 0) {
				popclip.showText("连接超时，正在重试... (" + (retryCount + 1) + "/" + (maxRetries + 1) + ")");
			}

			var startTime = Date.now();
			
			// 发送请求
			response = await axios.post(apiEndpoint, requestData, requestConfig);
			
			var endTime = Date.now();
			var duration = Math.round((endTime - startTime) / 1000 * 10) / 10;  // 保留一位小数
			
			var data = response.data;
			
			// 检查响应数据
			if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
				throw new Error("API返回数据格式错误");
			}
			
			var assistantMessage = data.choices[0].message;
			chatMessages.push(assistantMessage);
			lastChatTime = new Date();
			
			print("乔木AI：已收到来自 " + modelName + " 的对话回复（用时" + duration + "秒）");
			
			// 根据确定的模式处理响应
			if (responseMode === "copy") {
				// 仅将AI回复复制到剪贴板
				popclip.copyText(assistantMessage.content.trim());
				// 显示成功消息，包含生成时间
				popclip.showText("✅ 已复制到剪贴板（用时" + duration + "秒）", { preview: "复制成功" });
				return;
			} else if (responseMode === "replace") {
				// 仅用AI回复替换选中的文本
				popclip.pasteText(assistantMessage.content.trim());
				// 显示成功消息，包含生成时间
				popclip.showText("✅ 内容已替换（用时" + duration + "秒）", { preview: "替换成功" });
				return;
			} else {
				// 追加模式：在原文本后添加AI回复
				var appendedText = popclip.input.text.trim() + "\n\n" + assistantMessage.content.trim();
				popclip.pasteText(appendedText);
				// 显示成功消息，包含生成时间
				popclip.showText("✅ 对话已追加（用时" + duration + "秒）", { preview: "追加成功" });
				return;
			}
			
		} catch (error) {
			print("乔木AI：API请求失败（尝试 " + (retryCount + 1) + "）：" + error.message);
			
			// 如果是最后一次尝试，抛出错误
			if (retryCount >= maxRetries) {
				var friendlyError = handleApiError(error);
				throw new Error(friendlyError);
			}
			
			// 增加重试计数
			retryCount++;
			
			// 短暂延迟后重试
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}

} catch (error) {
	print("乔木AI：智能对话失败：" + error.message);
	popclip.showText("❌ " + error.message, { preview: "智能对话失败" });
} 