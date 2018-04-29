let axios = require('axios');
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
  'RDD'
])

const markets = getMarkets();
Promise
  .all([markets])
  .then(marketData => {
    marketData[0]
      .result
      .map(elem => {
        arr.push(elem.MarketCurrency)
      })
    initialSet = new Set(arr);
    // console.log(initialSet)
    console.log(compareSet(initialSet))
  })

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
      // console.log(temp)
      tempSet = new Set(temp);
      const message = '';
      eqSet(initSet, tempSet)
        ? message = "there's no new coins on the market"
        : message = getCurrencyInfo(getUnique(initSet, tempSet));
      return message;
    })
}

function eqSet(aSet, bSet) {
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
  let unicue = []
  for (var a of aSet)
    if (!bSet.has(a)) {
      unicue.push(a)
    }
  for (var b of bSet)
    if (!aSet.has(b)) {
      unicue.push(b)
    }
  // console.log(unicue)
  return unicue;
}

async function getCurrencyInfo(currencies) {
  // console.log(currencies)
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
      // console.log(currencyInfo)
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
