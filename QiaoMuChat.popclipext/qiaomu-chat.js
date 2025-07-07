// QiaoMu Chat PopClip Extension
// Based on PopClip official JavaScript action specification

// Message history storage (persistent across calls)
if (typeof messages === 'undefined') {
	var messages = [];
}

// Last chat timestamp
if (typeof lastChat === 'undefined') {
	var lastChat = new Date();
}

// Reset conversation history
function reset() {
	print("QiaoMu chat history");
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

print("QiaoMu Chat: Starting chat action");

// Check if API key is provided
if (!popclip.options.apikey || popclip.options.apikey.trim() === "") {
	throw new Error("Settings error: missing API key");
}

// Check and prepare API Base URL
var apiBaseUrl = popclip.options.apiBaseUrl || "https://api.tu-zi.com/v1";
apiBaseUrl = apiBaseUrl.trim();

// Remove trailing slash if present
if (apiBaseUrl.endsWith("/")) {
	apiBaseUrl = apiBaseUrl.slice(0, -1);
}

// Validate URL format
if (!apiBaseUrl.startsWith("http://") && !apiBaseUrl.startsWith("https://")) {
	throw new Error("Settings error: API Base URL must start with http:// or https://");
}

// Construct full API endpoint
var apiEndpoint = apiBaseUrl + "/chat/completions";
print("QiaoMu Chat: Using API endpoint: " + apiEndpoint);



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

// Determine which model to use: custom model takes priority
var selectedModel;
var customModel = popclip.options.customModel ? popclip.options.customModel.trim() : "";

if (customModel && customModel.length > 0) {
	selectedModel = customModel;
	print("QiaoMu Chat: Using custom model: " + selectedModel);
} else {
	selectedModel = popclip.options.model || "claude-sonnet-4-20250514";
	print("QiaoMu Chat: Using preset model: " + selectedModel);
}

// Show processing indicator with current model
var modelName = customModel && customModel.length > 0 ? customModel : getModelDisplayName(selectedModel);
popclip.showText("Processing with " + modelName + "...");

// Prepare request data
var requestData = {
	model: selectedModel,
	messages: messages,
	max_tokens: 1000,
	temperature: 0.7
};

// Use axios for HTTP request (PopClip bundled library)
var axios = require("axios");

// Make the API request (async operation - PopClip handles async automatically)
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

print("QiaoMu Chat: Received response from " + modelName);

// Determine response mode - prioritize modifier keys over settings
var responseMode = popclip.options.textMode || "append";

// Modifier key overrides (complete logic)
if (popclip.modifiers.shift) {
	responseMode = "copy";  // Shift = force copy mode
} else if (popclip.modifiers.option) {
	responseMode = "replace";  // Option = force replace mode
} else if (popclip.modifiers.command) {
	responseMode = "append";  // Command = force append mode
}

print("QiaoMu Chat: Using response mode: " + responseMode);

// Handle response based on determined mode
if (responseMode === "copy") {
	// Copy only the AI response to clipboard
	popclip.copyText(assistantMessage.content.trim());
	popclip.showSuccess();
	// Don't return anything - let PopClip handle success display
	return;
} else if (responseMode === "replace") {
	// Replace selected text with AI response only
	popclip.pasteText(assistantMessage.content.trim());
	return;
} else {
	// Append mode: add AI response after the original text
	var appendedText = popclip.input.text.trim() + "\n\n" + assistantMessage.content.trim();
	popclip.pasteText(appendedText);
	return;
}

// No exports needed, PopClip finds global functions by name 