# 🤖 QiaoMu Chat PopClip Extension

A powerful PopClip extension that integrates AI chat capabilities directly into your macOS workflow. Select any text and instantly chat with multiple AI models including Claude 4, GPT-4o, and more.

## ✨ Features

- **9 AI Models Support**: Claude 4, Claude 3 series, GPT-4o series, O3 Mini, Gemini 2.5 Pro, DeepSeek V3
- **Smart Conversation Management**: Automatic conversation history with context continuity
- **Multiple Response Modes**: Append, Copy, or Replace text handling
- **Auto Reset**: Configurable conversation timeout reset
- **Keyboard Shortcuts**: Shift/Option key modifiers for quick mode switching
- **Comprehensive Error Handling**: Network, API, and configuration error management

## 🚀 Quick Start

### Installation

1. **Download** or clone this repository
2. **Double-click** the `QiaoMuChat.popclipext` folder
3. **PopClip will open** and prompt for installation
4. **Click "Install Extension"** and confirm
5. **Set your QiaoMu API key** in PopClip preferences

### Configuration

Open PopClip preferences → Extensions → QiaoMu Chat:

- **QiaoMu API Key** (Required): Your API key from tu-zi.com
- **AI Model**: Choose your preferred model (default: Claude 4)
- **Response Mode**: How to handle AI responses
  - `Append`: Show question + answer
  - `Copy Only`: Copy AI response to clipboard
  - `Replace Text`: Replace selected text with AI response
- **System Message**: Instructions for the AI assistant
- **Auto Reset**: Reset conversation after X minutes of inactivity

## 🎮 Usage

### Basic Usage
1. **Select any text** in any application
2. **Click "Chat"** in the PopClip toolbar
3. **AI processes** and returns response

### Advanced Features
- **Continuous Conversation**: Maintains context until reset
- **Keyboard Shortcuts**:
  - `Shift + Click`: Force copy mode
  - `Option + Click`: Toggle replace/append mode
- **Reset Conversation**: Click "Reset" button to clear history

## 🔧 Supported AI Models

| Model | Display Name | Features |
|-------|--------------|----------|
| claude-sonnet-4-20250514 | Claude 4 (Recommended) | Latest and most powerful |
| claude-3-haiku-20240307 | Claude 3 Haiku | Fast responses |
| claude-3-opus-20240229 | Claude 3 Opus | High-quality output |
| o3-mini | O3 Mini | Lightweight model |
| gpt-4o-mini | GPT-4o Mini | OpenAI lightweight |
| gpt-4o | GPT-4o | OpenAI standard |
| gpt-4-all | GPT-4 All | GPT-4 complete |
| gemini-2.5-pro-preview-06-05 | Gemini 2.5 Pro | Google latest |
| deepseek-v3 | DeepSeek V3 | Excellent domestic model |

## 📁 Project Structure

```
QiaoMuChat.popclipext/
├── Config.json          # Extension configuration
├── qiaomu-chat.js       # Main chat functionality
├── reset.js             # Reset conversation history
├── qiaomu-icon.svg      # Main plugin icon
└── reset-icon.svg       # Reset button icon
```

## 🔍 Troubleshooting

### Common Issues

1. **Plugin icon not clickable**
   - Check API key is set correctly
   - Restart PopClip completely
   - Verify network connectivity

2. **"Unsigned extension" warning**
   - This is normal for third-party extensions
   - Click "Install Anyway" to proceed
   - Extension code is open source and safe

3. **API request failures**
   - Verify API key is valid
   - Check account balance/quota
   - Ensure tu-zi.com is accessible

### Debug Mode

Enable debug output to see detailed logs:

```bash
defaults write com.pilotmoon.popclip EnableExtensionDebug -bool YES
```

Then check Console.app for "PopClip" and "Extension" messages.

## 🛠️ Development

### Requirements
- macOS 10.15+
- PopClip app
- Valid QiaoMu API key

### File Validation
Run the included test script:
```bash
./final-test.sh
```

### Code Structure
- **Config.json**: PopClip extension configuration
- **qiaomu-chat.js**: Main chat logic with async/await
- **reset.js**: Conversation reset functionality
- Uses PopClip's built-in axios library for HTTP requests

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🆘 Support

- **Documentation**: Check `INSTALL-FINAL.md` for detailed installation guide
- **Issues**: Report bugs via GitHub Issues
- **Questions**: Use GitHub Discussions

---

**Enjoy intelligent AI conversations directly in your workflow!** 🚀✨ 