// 乔木AI PopClip 扩展 - 内容解释
// 基于 PopClip 官方 JavaScript 动作规范

// 获取用户友好的模型显示名称
function getModelDisplayName(modelId) {
	var modelNames = {
		"claude-sonnet-4-20250514": "Claude 4 Sonnet",
		"claude-sonnet-4-20250514-thinking": "Claude 4 Sonnet Thinking",
		"claude-opus-4-20250514": "Claude 4 Opus",
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

// 处理API错误，返回用户友好的错误消息
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

print("乔木AI：开始内容解释功能");

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
		popclip.showText(modelName + " 解释内容...（" + timeoutSeconds + "秒超时）");
	} else if (responseMode === "replace") {
		popclip.showText(modelName + " 替换内容...（" + timeoutSeconds + "秒超时）");
	} else {
		popclip.showText(modelName + " 解释中...（" + timeoutSeconds + "秒超时）");
	}

	// 获取最大Token数
	var maxTokensStr = popclip.options.maxTokens || "2048";
	var maxTokens = parseInt(maxTokensStr);
	if (isNaN(maxTokens) || maxTokens < 512) {
		maxTokens = 2048;  // 默认值
	}

	// 构建解释提示词
	var customPrompt = popclip.options.customExplainPrompt ? popclip.options.customExplainPrompt.trim() : "";
	var systemPrompt = customPrompt || `你是专业内容解释大师，擅长将复杂内容转化为清晰易懂的解释。

## 核心使命
用最简洁的语言，提供最清晰的解释

## 解释框架
- **核心概念**：提取主要含义和关键概念
- **背景信息**：补充必要的背景和来源
- **实际应用**：说明现实意义和应用价值
- **关键要点**：总结核心知识点

## 表达原则
- **简洁明了**：用最少的文字表达最多的信息
- **通俗易懂**：避免复杂术语，多用类比和实例
- **逻辑清晰**：按重要性排序，层次分明
- **重点突出**：标识关键信息，便于快速理解
- **受众适配**：根据内容复杂度自动调整解释深度

## 质量标准
- 解释准确无误
- 语言简洁流畅  
- 重点突出明确
- 易于理解记忆
- 内容完整不遗漏`;

	// 准备请求数据
	var requestData = {
		model: selectedModel,
		messages: [
			{ role: "system", content: systemPrompt },
			{ role: "user", content: popclip.input.text.trim() }
		],
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
			
			print("乔木AI：已收到来自 " + modelName + " 的解释回复（用时" + duration + "秒）");
			
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
				popclip.showText("✅ 解释内容已追加（用时" + duration + "秒）", { preview: "解释成功" });
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
	print("乔木AI：内容解释失败：" + error.message);
	popclip.showText("❌ " + error.message, { preview: "内容解释失败" });
} 