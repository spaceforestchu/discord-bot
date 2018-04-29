const axios = require('axios');
const commando = require('discord.js-commando');

let initialSet;
let arr = [];
let s1 = new Set([
  'LTC',
  'DOGE',
  'VTC',
  'PPC',
  'FTC',
  'RDD',
  'NXT'
]);

let s2 = new Set([
  'LTC',
  'DOGE',
  'VTC',
  'PPC',
  'FTC',
  'RDD',
  'NXT'
])

function compareSet(initSet) {
  let temp = [];
  const markets = getMarkets();
  Promise
    .all([markets])
    .then(val => {
      val[0]
        .result
        .map(elem => {
          temp.push(elem.MarketCurrency)
        })
      // console.log(temp, 'TEMP array inside compareSet after resolved promise and
      // map')
      tempSet = new Set(temp);
      // console.log(tempSet, 'tempSet inside compareSet')
      if(eqSet(s1, s2)){
        return 'equal'
      }else{
        return 'not equal'
      }
    })
}

function eqSet(aSet, bSet) {
  console.log('running eqSet', aSet, '<=== aSet', bSet, '<=== bSet' )
  if (aSet.size !== bSet.size) {
    return false;
  }
  for (var a of aSet)
    if (!bSet.has(a)) {
      return false;
    }
  return true;
}

function getUnique(aSet, bSet) {
  console.log('running getUnque', aSet, '<=== aSet', bSet, '<=== bSet' )
  let unicue = []
  for (var a of aSet)
    if (!bSet.has(a)) {
      unicue.push(a)
    }
  for (var b of bSet)
    if (!aSet.has(b)) {
      unicue.push(b)
    }
  return unicue;
}

async function getCurrencyInfo(currencies) {
  let currencyInfo = ''
  const coins = getCurrencies()
  Promise
    .all([coins])
    .then(coins => {
      // console.log('COINS DATA', coins)
      coins[0]
        .result
        .map(elem => {
          if (currencies.includes(elem.Currency)) {
            // console.log('includes', elem.Currency)
            for (let key in elem) {
              currencyInfo += `${key}: ${elem[key]} \n`
            }
          }
        })
      console.log(currencyInfo, 'currencyInfo inside GET-CURRENCY-INFO before returning it')
      return currencyInfo;
    })
}

async function getMarkets() {
  const data = await axios
    .get('https://bittrex.com/api/v1.1/public/getmarkets')
    .then(res => res.data)
    .then(data => data)
  return data
}

async function getCurrencies() {
  const data = await axios
    .get('https://bittrex.com/api/v1.1/public/getcurrencies')
    .then(res => res.data)
    .then(data => data)
  return data
}

class newCoins extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'watch',
      group: 'random',
      memberName: 'watch',
      description: 'Starts watching for new coins'
    });
  }

  async run(message, args) {
    // message.reply(initialSet);
    const markets = getMarkets();
    // console.log(markets, 'markets inside RUN')
    Promise
      .all([markets])
      .then(marketData => {
        // console.log(marketData[0].result, 'marketData[0].result inside RUN')
        marketData[0]
          .result
          .map(elem => {
            arr.push(elem.MarketCurrency)
          })
        initialSet = new Set(arr);
        // console.log(initialSet, 'initialSet inside RUN before using it as argument
        // for compareSet')
        const answer = compareSet(initialSet);
        console.log(answer, 'answer inside RUN')
      })
    // console.log(initialSet);
  }

}

module.exports = newCoins;
