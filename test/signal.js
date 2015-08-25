var λ       = require('fantasy-check/src/adapters/nodeunit'),
    functor = require('fantasy-check/src/laws/functor'),

    signals = require('../fantasy-signals'),

    Signal  = signals.Signal;

function run(x) {
    return x.x.get();
}

exports.signal = {
    
    // Functor tests
    'All (Functor)': functor.laws(λ)(Signal.of, run),
    'Identity (Functor)': functor.identity(λ)(Signal.of, run),
    'Composition (Functor)': functor.composition(λ)(Signal.of, run),
};
