// Reset QiaoMu Chat conversation history

print("Resetting QiaoMu chat history");

// Clear message history
if (typeof messages !== 'undefined') {
    messages.length = 0;
}

// Reset timestamp
if (typeof lastChat !== 'undefined') {
    lastChat = new Date();
}

return "Chat history reset successfully"; 