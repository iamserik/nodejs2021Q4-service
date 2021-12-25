import pino from 'pino';
import * as fs from 'fs';
import { Streams } from 'pino-multi-stream';
import WritableStream from '../streams/writable';

const streams: Streams = [
    { stream: new WritableStream('./logs/info.log') },
    { level: 'warn', stream: new WritableStream('./logs/warn.log') },
    { level: 'error', stream: new WritableStream('./logs/error.log') },
];

const opts = {
    levels: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
    },
    dedupe: true,
}

process.on('uncaughtException', (err, origin) => {
    console.log('Error =============', err.message, origin);
    fs.createWriteStream('./logs/error.log');
    process.exit(1);
});

process.on('unhandledRejection', (err, origin) => {
    console.log(err, origin);
    fs.createWriteStream('./logs/error.log');
    process.exit(1);
});

export const logger = pino({
    level: 'info',
    serializers: {
        res (reply) {
            return {
                statusCode: reply.statusCode,
            };
        },
        req (request) {
            return {
                method: request.method,
                url: request.url,
                parameters: request.params,
            };
        },
    },
}, pino.multistream(streams, opts));
