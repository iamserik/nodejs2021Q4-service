import pino from 'pino';
import { Streams } from 'pino-multi-stream';
import WritableStream from '../streams/writable';
import config from '../common/config';
import { validateLevel } from '../common/utils';

const today = new Date().toJSON().slice(0, 10).split('-').reverse().join('-');

const defaultWriteStream = new WritableStream(`./logs/info/Log-${today}.log`);
const warnWriteStream = new WritableStream(`./logs/warn/Log-${today}.log`);
const errorWriteStream = new WritableStream(`./logs/error/Log-${today}.log`);

const streams: Streams = [
    { stream: defaultWriteStream },
    { level: 'warn', stream: warnWriteStream },
    { level: 'error', stream: errorWriteStream },
];

process.on('uncaughtException', (err: Error) => {
    errorWriteStream.write(`${err.message}\n`);
    process.exit(1);
});

process.on('unhandledRejection', (reason: string) => {
    errorWriteStream.write(`${reason}\n`);
    process.exit(1);
});

export const logger = pino({
    level: validateLevel(config.LOWEST_DEBUG_LEVEL),
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
}, pino.multistream(streams));
