const commando = require('discord.js-commando');
const bot = new commando.Client();

// bot.on('message', (message) => {
//   if (message.content == "ping") {
//     //message.reply('pong');
//
//     message.channel.sendMessage('pong');
//
//   }
// });


bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login('NDIyNTc1NTQ4NDM5NTkyOTYx.DYd1IQ.7ZHb8_s3pr0nETadsT07BPzktgM');
