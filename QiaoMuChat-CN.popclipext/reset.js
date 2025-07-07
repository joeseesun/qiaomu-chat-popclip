// 乔木智写 - 重置对话历史

// 重置消息历史
if (typeof messages !== 'undefined') {
	messages.length = 0;
	print("乔木智写：消息历史已清除");
}

// 重置最后聊天时间
if (typeof lastChat !== 'undefined') {
	lastChat = new Date();
}

// 显示重置完成消息
popclip.showText("对话历史已重置", { preview: "✅ 重置成功" }); 