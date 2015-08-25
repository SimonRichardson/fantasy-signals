var daggy = require('daggy'),

    Time = daggy.tagged('x');

Time.millisecond = Time.of(1.0);
Time.second = Time.of(1000.0);

Time.now = function() {
    var perf = typeof performance !== 'undefined' ? performance : null,
        proc = typeof process !== 'undefined' ? process : null;
    return (
        (perf && perf.now) ||
        (proc && proc.hrtime && function() {
            var t = proc.hrtime();
            return (t[0] * 1e9 + t[1]) / 1e6;
        }) ||
        Date.now
    ).call(perf);
};

Time.prototype.every = function(t) {
    var out = Signal.of(this.now());
    setInterval(function() {
        out.x.set(Time.now());
    }, t);
    return out;
};

Time.prototype.delay = function(t, s) {
    var out = Signal.of(s.x.get()),
        first = true;
    s.x.subscribe(function(x) {
        if(first) {
            first = false;
        } else {
            setTimeout(function() {
                out.x.set(val);
            }, t);
        }
    });
    return out;
};

Time.prototype.since = function(t, s) {
    var out = Signal.of(false),
        first = true,
        timer = undefined,
        tick = function() {
            out.x.set(false);
            timer = undefined;
        };
    s.x.subscribe(function() {
        if(first) {
            first = false;
            return;
        }
        if(timer === undefined) {
            out.set(true);
            timer = setTimeout(tick, t);
        } else {
             clearTimeout(timer);
             timer = setTimeout(tick, t);
        }
    });
    return out;
};

// Export
if (typeof module != 'undefined')
    module.exports = Time;
