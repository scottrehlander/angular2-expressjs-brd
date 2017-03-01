"use strict";
exports.__esModule = true;
var config = {
    "server": {
        "serverPort": "4300",
        "secret": "RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!",
        "length": 128,
        "digest": "sha256"
    }
};
function get() {
    if (process.env.node_env == 'production') {
        return Object.assign(config, require('./app.config.prod').get());
    }
    return Object.assign(config, require('./app.config.dev').get());
}
exports.get = get;
