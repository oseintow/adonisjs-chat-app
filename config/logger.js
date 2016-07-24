var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: './storage/logs/filelog-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: './storage/logs/filelog-error.log',
            level: 'error'
        }),
        new (winston.transports.File)({
            name: 'debug-file',
            filename: './storage/logs/filelog-debug.log',
            level: 'debug'
        })
    ]
});


module.exports=logger;

