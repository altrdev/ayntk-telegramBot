const Telegram = require('telegraf/telegram');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const express = require('express');
const expressApp = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const telegram = new Telegram(process.env.TELEGRAM_TOKEN);

const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
]);

expressApp.get('/health', (req, res) => {
    res.send('Status: OK')
});

expressApp.post('/netlify-hook', jsonParser, (req, res) => {
    console.log(req.body.test);
    telegram.sendMessage(process.env.CHANNEL_ID, "test", Extra.markup(keyboard));
    res.json({status: "ok"})
});

expressApp.listen(port, () => {
    console.log('Server starting on port ' + port)
});



