// QiaoMu Chat PopClip Extension
// Based on PopClip official JavaScript action specification

// Message history storage (global variable)
var messages = messages || [];

// Last chat timestamp
var lastChat = lastChat || new Date();

// Reset conversation history
function reset() {
	print("Resetting TuZi chat history");
	messages.length = 0;
	popclip.showText("Chat history reset", { preview: "✅ Reset complete" });
}

// Get user-friendly model display name
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

// Main execution function (async)
(async function() {
	print("QiaoMu Chat: Starting chat action");

	// Check if API key is provided
	if (!popclip.options.apikey || popclip.options.apikey.trim() === "") {
		popclip.showText("Please set your QiaoMu API key in PopClip preferences");
		throw new Error("Settings error: missing API key");
	}

	// Reset conversation if timeout reached
	if (popclip.options.resetMinutes && popclip.options.resetMinutes.length > 0) {
		var resetInterval = parseInt(popclip.options.resetMinutes) * 1000 * 60;
		if (new Date().getTime() - lastChat.getTime() > resetInterval) {
			print("QiaoMu Chat: Resetting conversation due to timeout");
			messages = [];
		}
	}

	// Add system message if this is the start of conversation
	if (messages.length === 0) {
		var systemMessage = popclip.options.systemMessage ? popclip.options.systemMessage.trim() : "";
		if (systemMessage) {
			messages.push({ role: "system", content: systemMessage });
			print("QiaoMu Chat: Added system message");
		}
	}

	// Add user message to history
	messages.push({ role: "user", content: popclip.input.text.trim() });
	print("QiaoMu Chat: Added user message, total messages: " + messages.length);

	// Show processing indicator with current model
	var modelName = getModelDisplayName(popclip.options.model);
	popclip.showText("Processing with " + modelName + "...");

	// Prepare request data
	var requestData = {
		model: popclip.options.model || "claude-sonnet-4-20250514",
		messages: messages,
		max_tokens: 1000,
		temperature: 0.7
	};

	// Use axios for HTTP request (PopClip bundled library)
	var axios = require("axios");

	try {
		// Make the API request (async)
		var response = await axios.post("https://api.tu-zi.com/v1/chat/completions", requestData, {
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

		print("QiaoMu Chat: Received response from " + modelName);

		// Handle response based on user preference
		var copy = popclip.options.textMode === "copy" || popclip.modifiers.shift;
		var replace = popclip.options.textMode === "replace";

		// Toggle mode with option key
		if (popclip.modifiers.option) {
			replace = !replace;
		}

		if (copy) {
			// Copy only the AI response
			popclip.copyText(assistantMessage.content.trim());
			return "Response copied to clipboard";
		} else if (replace) {
			// Replace selected text with AI response
			return assistantMessage.content.trim();
		} else {
			// Append: show both user input and AI response
			var conversation = popclip.input.text.trim() + "\n\n---\n\n" + assistantMessage.content.trim();
			return conversation;
		}
	} catch (error) {
		var errorMsg = "Request failed";
		if (error.response && error.response.data && error.response.data.error) {
			errorMsg = "API Error: " + error.response.data.error.message;
		} else if (error.message) {
			errorMsg = "Error: " + error.message;
		}
		popclip.showText(errorMsg);
		throw new Error(errorMsg);
	}
})();

// No exports needed, PopClip finds global functions by name. 