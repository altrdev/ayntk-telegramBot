import {Telegram} from "telegraf";

const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const express = require('express');
const expressApp = express();

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
    console.log(req.body);
    telegram.sendMessage(process.env.CHANNEL_ID, "test", Extra.markup(keyboard));
    res.status(200)
});

expressApp.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});


