const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: "kitsmpyog.aternos.me",
    port: 25565,
    username: "BOAT",
    version: "1.20.4"
});

// Handle login on spawn
bot.on('spawn', () => {
    console.log('Bot spawned, attempting login...');
    // Wait 3 seconds then send login command
    setTimeout(() => {
        bot.chat('/login bot123');
        console.log('Login command sent');
    }, 3000);
    
    // Start anti-AFK after login
    startAntiAFK();
});

// Anti-AFK function
function startAntiAFK() {
    setInterval(() => {
        // Random movements
        if (Math.random() < 0.3) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 100);
        }
        if (Math.random() < 0.3) {
            bot.swingArm('right');
        }
    }, 300000); // Every 5 minutes
}

// Listen for chat messages
bot.on('message', (message) => {
    console.log(message.toString());
});

// Reconnect if disconnected
bot.on('end', () => {
    console.log('Disconnected, reconnecting...');
    setTimeout(() => {
        bot = mineflayer.createBot({
            host: "kitsmpyog.aternos.me",
            port: 25565,
            username: "BOAT",
            version: "1.20.4"
        });
    }, 5000);
});

// Error handling
bot.on('error', (err) => {
    console.log('Error:', err);
});

// Export bot status for web interface
let botStatus = {
    online: false,
    lastUpdate: null
};

bot.on('spawn', () => {
    botStatus.online = true;
    botStatus.lastUpdate = new Date();
});

bot.on('end', () => {
    botStatus.online = false;
    botStatus.lastUpdate = new Date();
});

module.exports = {
    getStatus: () => botStatus,
    reconnect: () => {
        bot.end();
        return "Bot reconnection initiated";
    }
};
