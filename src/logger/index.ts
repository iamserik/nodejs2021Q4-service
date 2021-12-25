import pino from 'pino';
import { Streams } from 'pino-multi-stream';
import WritableStream from '../streams/writable';
import config from '../common/config';

const levels: Record<string, string> = {
    0: 'fatal',
    1: 'error',
    2: 'warn',
    3: 'info',
    4: 'debug',
    5: 'trace',
};

const streams: Streams = [
    { stream: new WritableStream('./logs/info.log') },
    { level: 'warn', stream: new WritableStream('./logs/warn.log') },
    { level: 'error', stream: new WritableStream('./logs/error.log') },
];

export const logger = pino({
    level: levels[config.LOWEST_DEBUG_LEVEL],
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

process.on('uncaughtException', (err, origin) => {
    logger.error(err.message);
    process.exit(1);
});

process.on('unhandledRejection', (reason, origin) => {
    logger.error(reason);
    process.exit(1);
});