const config = { 
    "server": {
        "serverPort": "4300",
        "secret": "RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!",
        "length": 128,
        "digest": "sha256"
    },
    "logging": {
        "filepath": "logs/adlp.log",
        "level": "silly",
        "json": false
    }
};

export = process.env.node_env == 'production' ? 
    Object.assign(config, require('./app.config.prod').get()) :
    Object.assign(config, require('./app.config.dev').get());