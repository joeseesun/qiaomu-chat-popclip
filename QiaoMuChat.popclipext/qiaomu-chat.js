// QiaoMu AI Chat PopClip Extension
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
	print("QiaoMu AI: Reset conversation history");
	messages.length = 0;
	popclip.showText("Chat history reset", { preview: "✅ Reset complete" });
}

// Get user-friendly model display names
function getModelDisplayName(modelId) {
	var modelNames = {
		"claude-sonnet-4-20250514": "Claude 4 Sonnet",
		"claude-sonnet-4-20250514-thinking": "Claude 4 Sonnet Thinking",
		"claude-opus-4-20250514": "Claude 4 Opus",
		"o3-mini": "O3 Mini",
		"gpt-4o-mini": "GPT-4o Mini",
		"gpt-4o": "GPT-4o",
		"gpt-4-all": "GPT-4 All",
		"gemini-2.5-pro-preview-06-05": "Gemini 2.5 Pro",
		"deepseek-v3": "DeepSeek V3"
	};
	return modelNames[modelId] || modelId;
}

print("QiaoMu AI: Starting chat action");

// Check if API key is provided
if (!popclip.options.apikey || popclip.options.apikey.trim() === "") {
	throw new Error("Configuration error: Missing API key");
}

// Check and prepare API base URL
var apiBaseUrl = popclip.options.apiBaseUrl || "https://api.tu-zi.com/v1";
apiBaseUrl = apiBaseUrl.trim();

// Remove trailing slash if present
if (apiBaseUrl.endsWith("/")) {
	apiBaseUrl = apiBaseUrl.slice(0, -1);
}

// Validate URL format
if (!apiBaseUrl.startsWith("http://") && !apiBaseUrl.startsWith("https://")) {
	throw new Error("Configuration error: API base URL must start with http:// or https://");
}

// Build complete API endpoint
var apiEndpoint = apiBaseUrl + "/chat/completions";
print("QiaoMu AI: Using API endpoint: " + apiEndpoint);

// If this is the start of conversation, add system message
if (messages.length === 0) {
	var systemMessage = popclip.options.systemMessage ? popclip.options.systemMessage.trim() : "";
	if (systemMessage) {
		messages.push({ role: "system", content: systemMessage });
		print("QiaoMu AI: Added system message");
	}
}

// Add user message to history
messages.push({ role: "user", content: popclip.input.text.trim() });
print("QiaoMu AI: Added user message, total messages: " + messages.length);

// Determine which model to use: custom model takes priority
var selectedModel;
var customModel = popclip.options.customModel ? popclip.options.customModel.trim() : "";

if (customModel && customModel.length > 0) {
	selectedModel = customModel;
	print("QiaoMu AI: Using custom model: " + selectedModel);
} else {
	selectedModel = popclip.options.model || "claude-sonnet-4-20250514";
	print("QiaoMu AI: Using preset model: " + selectedModel);
}

// Determine response mode - modifier keys override settings
var responseMode = popclip.options.textMode || "append";

// Modifier key overrides (complete logic)
if (popclip.modifiers.shift) {
	responseMode = "copy";  // Shift = force copy mode
} else if (popclip.modifiers.option) {
	responseMode = "replace";  // Option = force replace mode
} else if (popclip.modifiers.command) {
	responseMode = "append";  // Command = force append mode
}

print("QiaoMu AI: Using response mode: " + responseMode);

// Display processing indicator and current model
var modelName = customModel && customModel.length > 0 ? customModel : getModelDisplayName(selectedModel);

// Show different loading messages based on response mode
if (responseMode === "copy") {
	popclip.showText("Generating content with " + modelName + "...");
} else if (responseMode === "replace") {
	popclip.showText("Replacing content with " + modelName + "...");
} else {
	popclip.showText("Processing with " + modelName + "...");
}

// Prepare request data
var requestData = {
	model: selectedModel,
	messages: messages,
	max_tokens: 1000,
	temperature: 0.7
};

// Use axios for HTTP request (PopClip built-in library)
var axios = require("axios");

// Make API request (async operation - PopClip handles async automatically)
var startTime = Date.now();

var response = await axios.post(apiEndpoint, requestData, {
	headers: {
		"Authorization": "Bearer " + popclip.options.apikey,
		"Content-Type": "application/json"
	},
	timeout: 30000
});

var endTime = Date.now();
var duration = Math.round((endTime - startTime) / 1000 * 10) / 10;  // Keep one decimal place

var data = response.data;
var assistantMessage = data.choices[0].message;
messages.push(assistantMessage);
lastChat = new Date();

print("QiaoMu AI: Received reply from " + modelName + " (took " + duration + " seconds)");

// Handle response based on determined mode
if (responseMode === "copy") {
	// Only copy AI reply to clipboard
	popclip.copyText(assistantMessage.content.trim());
	// Show success message with generation time
	popclip.showText("✅ Content copied to clipboard (took " + duration + " seconds)", { preview: "Copy successful" });
	return;
} else if (responseMode === "replace") {
	// Only replace selected text with AI reply
	popclip.pasteText(assistantMessage.content.trim());
	// Show success message with generation time
	popclip.showText("✅ Content replaced (took " + duration + " seconds)", { preview: "Replace successful" });
	return;
} else {
	// Append mode: add AI reply after original text
	var appendedText = popclip.input.text.trim() + "\n\n" + assistantMessage.content.trim();
	popclip.pasteText(appendedText);
	// Show success message with generation time
	popclip.showText("✅ Conversation appended (took " + duration + " seconds)", { preview: "Append successful" });
	return;
}

// No need for exports, PopClip finds global functions by name 