const Telegraf = require('telegraf')

const bot = new Telegraf('624794430:AAHQ5gyDoJOFIrXtft0FcfJN8ccojzkzjnQ')



var  hello =  () =>  {
        bot.catch((err) => {
            console.log('Ooops', err)
        })
        bot.start((ctx) => ctx.reply('Welcome'))
        bot.help((ctx) => ctx.reply('Send me a sticker'))
        bot.on('sticker', (ctx) => ctx.reply('👍'))
        bot.hears('hi', (ctx) => ctx.reply('Hey there'))
        bot.command('hipster', Telegraf.reply('λ'))
        bot.launch()
  }

module.exports = {hello}




