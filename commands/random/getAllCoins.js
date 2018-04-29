const Axios = require('axios');

const commando = require('discord.js-commando');

class getAllCoins extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'coins',
      group: 'random',
      memberName: 'coins',
      description: 'Shows all coins info'
    });
  }

  async run(message, args) {
    Axios
      .get('https://bittrex.com/api/v1.1/public/getmarkets')
      .then(res => res.data)
      .then((data) => {
        var resp = '';
        if (data.success) {
          let howMany = args
            ? args
            : 50
          for (let i = 0; i < howMany; i++) {
            resp += data.result[i].MarketName + '\n'
          }
          message.reply(resp)
        } else {
          message.reply('request failed');
        }
      })
  }

}

module.exports = getAllCoins;
