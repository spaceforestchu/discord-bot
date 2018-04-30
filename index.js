const commando = require('discord.js-commando');
const bot = new commando.Client();
const { TOKEN } = require('./secret');

bot.on('message', (message) => {
  if (message.content == "ping") {
    //message.reply('pong');

    message.channel.sendMessage('pong');

  }
});


bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login(TOKEN);
