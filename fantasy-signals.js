var channel = require('./src/channel'),
    signal  = require('./src/signal'),
    time    = require('./src/time');

if (typeof module != 'undefined')
    module.exports = {
        Channel: channel,
        Signal : signal,
        Time   : time
    };
