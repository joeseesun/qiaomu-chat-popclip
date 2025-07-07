// Validate PopClip Config.json
const fs = require('fs');
const path = require('path');

try {
    const configPath = path.join(__dirname, 'TuZiChat.popclipext', 'Config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    console.log('✅ Config.json is valid JSON');
    console.log('📝 Extension name:', config.name);
    console.log('🔧 Actions:', config.actions.length);
    console.log('⚙️  Options:', config.options.length);
    console.log('🌐 Entitlements:', config.entitlements);
    
    // Check required files exist
    const extDir = path.join(__dirname, 'TuZiChat.popclipext');
    
    config.actions.forEach(action => {
        if (action.javascriptFile) {
            const jsFile = path.join(extDir, action.javascriptFile);
            if (fs.existsSync(jsFile)) {
                console.log('✅ JavaScript file exists:', action.javascriptFile);
            } else {
                console.log('❌ JavaScript file missing:', action.javascriptFile);
            }
        }
        
        if (action.icon) {
            const iconFile = path.join(extDir, action.icon);
            if (fs.existsSync(iconFile)) {
                console.log('✅ Icon file exists:', action.icon);
            } else {
                console.log('❌ Icon file missing:', action.icon);
            }
        }
    });
    
    console.log('\n🎉 Configuration validation complete!');
    
} catch (error) {
    console.error('❌ Error validating config:', error.message);
    process.exit(1);
}
