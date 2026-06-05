const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false
});


const CHANNEL_ID = '1511721688428056578';
const SERVER_ID = '1511721687627071648';


const MESSAGE_CONTENT = 'nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga nga';

const INTERVAL = 1500;

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`User ID: ${client.user.id}`);
    
    const channel = await client.channels.fetch(CHANNEL_ID).catch(err => {
        console.error('Failed to fetch channel:', err.message);
        process.exit(1);
    });
    
    if (!channel) {
        console.error('Channel not found! Check the CHANNEL_ID.');
        process.exit(1);
    }
    
    console.log(`Target channel: #${channel.name} in "${channel.guild.name}"`);
    console.log('Starting spam in 3 seconds...');
    
    setTimeout(() => {
        console.log('Spamming started Press Ctrl+C to stop.');

        const spamInterval = setInterval(async () => {
            try {
                await channel.send(MESSAGE_CONTENT);
                console.log(`[${new Date().toLocaleTimeString()}] Message sent`);
            } catch (error) {
                console.error('Failed to send:', error.message);
                if (error.code === 429) {
                    console.error('Rate limited! Waiting...');
                }
            }
        }, INTERVAL);

        process.on('SIGINT', () => {
            clearInterval(spamInterval);
            console.log('\nStopping spam...');
            client.destroy();
            process.exit(0);
        });
        
    }, 3000);
});

client.on('error', console.error);
client.on('warn', console.warn);


client.login('TOKEN').catch(err => {
    console.error('Login failed:', err.message);
    console.error('use a user token please. account may be disabled or invaild');
});
