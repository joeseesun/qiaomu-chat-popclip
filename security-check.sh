#!/bin/bash

echo "🔒 QiaoMu Chat PopClip Extension - Security Check"
echo "================================================="

# Check for potential API keys in files
echo "🔍 Checking for potential API keys..."

# Common API key patterns
patterns=(
    "sk-[a-zA-Z0-9]{32,}"
    "api[_-]?key[\"':\s]*[a-zA-Z0-9]{20,}"
    "secret[\"':\s]*[a-zA-Z0-9]{20,}"
    "token[\"':\s]*[a-zA-Z0-9]{20,}"
)

found_issues=false

for pattern in "${patterns[@]}"; do
    echo "  Checking pattern: $pattern"
    if grep -r -E "$pattern" . --exclude-dir=.git --exclude="*.sh" --exclude="*.md" 2>/dev/null; then
        echo "  ⚠️  Potential API key found!"
        found_issues=true
    else
        echo "  ✅ No matches found"
    fi
done

# Check for hardcoded API endpoints with actual keys (not variables)
echo ""
echo "🌐 Checking for hardcoded credentials in API calls..."
if grep -r -E "Bearer [a-zA-Z0-9]{20,}" . --exclude-dir=.git --exclude="*.sh" --exclude="*.md" 2>/dev/null; then
    echo "⚠️  Found hardcoded authorization headers!"
    found_issues=true
else
    echo "✅ No hardcoded credentials found"
fi

# Check .gitignore effectiveness
echo ""
echo "📁 Checking .gitignore coverage..."
if [ -f ".gitignore" ]; then
    echo "✅ .gitignore exists"
    
    # Check if common sensitive patterns are ignored
    sensitive_patterns=("*.key" "*.secret" "*-with-key*")
    for pattern in "${sensitive_patterns[@]}"; do
        if grep -q "$pattern" .gitignore; then
            echo "✅ $pattern is ignored"
        else
            echo "⚠️  $pattern should be added to .gitignore"
        fi
    done
else
    echo "❌ .gitignore not found!"
    found_issues=true
fi

# Check for proper API key usage
echo ""
echo "🔧 Checking API key usage patterns..."
if grep -r "popclip.options.apikey" . --exclude-dir=.git --exclude="*.sh" --exclude="*.md" 2>/dev/null | grep -q "Authorization"; then
    echo "✅ API key is properly used via PopClip options"
else
    echo "⚠️  API key usage pattern not found"
fi

# Final report
echo ""
echo "📋 Security Check Summary"
echo "========================"

if [ "$found_issues" = true ]; then
    echo "❌ SECURITY ISSUES FOUND!"
    echo "Please review and fix the issues above before pushing to repository."
    exit 1
else
    echo "✅ NO SECURITY ISSUES DETECTED"
    echo "Repository is safe to push to GitHub."
    echo ""
    echo "🔒 Security Best Practices:"
    echo "- Never commit API keys or secrets"
    echo "- Use PopClip options for sensitive data"
    echo "- Keep .gitignore up to date"
    echo "- Regularly audit repository for leaked credentials"
fi

echo ""
echo "🚀 Ready to push to GitHub: https://github.com/joeseesun/qiaomu-chat-popclip" 