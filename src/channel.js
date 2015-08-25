var daggy = require('daggy'),
    Signal = require('./signal'),

    Channel = daggy.tagged('x');

Channel.of = function(x) {
    return Channel(Signal.of(x));
};

Channel.prototype.send = function(v) {
    return this.x.x.set(v);
};

Channel.prototype.subscribe = function() {
    return this.x;
};

// Export
if (typeof module != 'undefined')
    module.exports = Channel;
