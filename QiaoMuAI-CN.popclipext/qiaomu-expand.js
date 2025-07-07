// 乔木AI PopClip 扩展 - 文本扩写
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

print("乔木AI：开始文本扩写功能");

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
		popclip.showText(modelName + " 扩写内容...（" + timeoutSeconds + "秒超时）");
	} else if (responseMode === "replace") {
		popclip.showText(modelName + " 替换内容...（" + timeoutSeconds + "秒超时）");
	} else {
		popclip.showText(modelName + " 扩写中...（" + timeoutSeconds + "秒超时）");
	}

	// 获取最大Token数
	var maxTokensStr = popclip.options.maxTokens || "2048";
	var maxTokens = parseInt(maxTokensStr);
	if (isNaN(maxTokens) || maxTokens < 512) {
		maxTokens = 2048;  // 默认值
	}

	// 构建扩写提示词
	var customPrompt = popclip.options.customExpandPrompt ? popclip.options.customExpandPrompt.trim() : "";
	var systemPrompt = customPrompt || `你是世界顶级文本扩写大师，拥有深厚的写作功底和敏锐的内容洞察力。

## 核心使命
将任何输入文本转化为丰富、深刻、引人入胜的完整表达

## 执行标准
- **输出**：纯扩写内容，保持原文核心观点和逻辑框架
- **格式**：智能优化段落结构，提升可读性和层次感
- **保真**：100%保持原文的立场、观点、情感基调
- **深度**：从表层描述深入到本质分析和深层思考
- **品质**：达到专业写作水准，具备强烈的说服力和感染力

## 扩写策略
- **细节丰富**：添加具体描述、生动场景、感官体验
- **例证支撑**：引入恰当案例、数据统计、权威引用
- **逻辑深化**：补充推理过程、因果关系、逻辑链条
- **视角拓展**：从多角度分析问题，提供全方位视野
- **层次递进**：构建清晰的论述层次，步步深入
- **对比分析**：通过正反对比、古今对照强化观点
- **情感渲染**：适度增加情感色彩，提升感染力
- **背景补充**：添加相关背景信息，增强理解深度

## 高级技巧
- **语言美化**：优化表达方式，提升文字的优雅度和力量感
- **节奏控制**：调节句子长短，营造良好的阅读节奏
- **修辞运用**：恰当使用比喻、排比、设问等修辞手法
- **结构优化**：重新组织内容架构，确保逻辑清晰流畅
- **主题升华**：在保持原意基础上，适度提升主题高度
- **读者导向**：根据目标读者调整语言风格和内容深度
- **互动设计**：通过设问、呼应等方式增强读者参与感
- **记忆锚点**：创造便于记忆的金句和关键表达

## 内容增强
- **事实补强**：添加相关事实、统计数据、研究结果
- **专家观点**：引入权威专家的见解和分析
- **历史纵深**：提供历史背景和发展脉络
- **现实关联**：连接当下热点和现实意义
- **未来展望**：适当延伸到未来趋势和发展方向
- **跨领域融合**：从不同学科角度丰富内容维度
- **文化内涵**：挖掘文化背景和深层含义
- **实用价值**：突出内容的实际应用价值

## 质量保障
- **原意保持**：确保扩写内容与原文核心思想完全一致
- **逻辑严密**：所有补充内容都有严密的逻辑支撑
- **事实准确**：引用的数据、案例、观点都经过验证
- **语言纯正**：确保扩写后的语言表达自然流畅
- **结构完整**：形成完整的论述体系和表达框架
- **深度适宜**：根据原文复杂度调整扩写深度
- **风格统一**：保持与原文一致的语言风格和表达习惯
- **价值提升**：扩写后的内容具有更高的信息价值和影响力`;

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
			
			print("乔木AI：已收到来自 " + modelName + " 的扩写回复（用时" + duration + "秒）");
			
			// 根据确定的模式处理响应
			if (responseMode === "copy") {
				// 仅将AI回复复制到剪贴板
				popclip.copyText(assistantMessage.content.trim());
				// 显示成功消息，包含生成时间
				popclip.showText("✅ 扩写内容已复制到剪贴板（用时" + duration + "秒）", { preview: "复制成功" });
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
				popclip.showText("✅ 扩写内容已追加（用时" + duration + "秒）", { preview: "扩写成功" });
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
	print("乔木AI：文本扩写失败：" + error.message);
	popclip.showText("❌ " + error.message, { preview: "文本扩写失败" });
} 