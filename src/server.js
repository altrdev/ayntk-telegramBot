const Telegram = require('telegraf/telegram');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const Utility = require('./utility');
const config = require('./config.json');
const express = require('express');
const expressApp = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const telegram = new Telegram(process.env.TELEGRAM_TOKEN);

expressApp.get('/health', (req, res) => {
    res.send('Status: OK')
});

expressApp.post('/netlify-hook/deploy/succeeded', jsonParser, (req, res) => {
    res.json({status: "ok"});

    const mapObj = {
        "{{site}}": req.body.url,
        "{{user}}": req.body.committer,
    };

    telegram.sendMessage(process.env.CHANNEL_ID, Utility.replaceAll(config.deploySucceededMessage, mapObj), Extra.markdown());
});

expressApp.post('/netlify-hook/deploy/failed', jsonParser, (req, res) => {
    res.json({status: "ok"});

    const mapObj = {
        "{{site}}": req.body.url,
        "{{message}}": req.body.error_message,
        "{{user}}": req.body.committer,
    };

    telegram.sendMessage(process.env.CHANNEL_ID, Utility.replaceAll(config.deployFailedMessage, mapObj), Extra.markdown());
});

expressApp.post('/netlify-hook/form', jsonParser, (req, res) => {
    res.json({status: "ok"});

    const mapObj = {
        "{{site}}": req.body.site_url,
        "{{sender_name}}": req.body.data.name,
        "{{message}}": req.body.data.message,
    };

    telegram.sendMessage(process.env.CHANNEL_ID, Utility.replaceAll(config.deployFailedMessage, mapObj), Extra.markdown());
});

expressApp.listen(port, () => {
    console.log('Server starting on port ' + port)
});



