var daggy = require('daggy'),

    Signal = daggy.tagged('x');

Signal.of = function(x) {
    var subs = [],
        val = x;
    return Signal({
        subscribe: function(sub) {
            subs.push(sub);
            sub(val);
        },
        get: function() {
            return val;
        },
        set: function(x) {
            val = x;
            subs.forEach(function(x) {
                sub(x);
            });
        }
    });
};

Signal.prototype.map = function(f) {
    var out = Signal.of(f(this.x.get()));
    this.x.subscribe(function(x) {
        out.x.set(f(x));
    });
    return out;
};

Signal.prototype.ap = function(x) {
    var self = this.x,
        out = Signal.of(self.get()(x.x.get())),
        fun = function() {
            out.set(self.get())(x.x.get());
        };
    this.x.subscribe(fun);
    x.x.subscribe(fun);
    return out;
};

Signal.prototype.concat = function(x) {
    var out = Signal.of(this.x.get());
    this.x.subscribe(out.x.set);
    x.x.subscribe(out.x.set);
    return out;
};

Signal.prototype.runSignal = function() {
    this.x.subscribe(function(f) {
        f();
    });
    return {};
};

// Export
if (typeof module != 'undefined')
    module.exports = Signal;
