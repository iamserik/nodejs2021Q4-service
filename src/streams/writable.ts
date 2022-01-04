import * as fs from 'fs';
import * as stream from 'stream';

type CallbackFunc = (err: Error | null) => void;

export default class WritableStream extends stream.Writable {
    writePath: string;

    fd: number | null = null;

    constructor(path: string) {
        super();
        this.writePath = path;
        this.fd = null;
    }

    _construct(callback: CallbackFunc) {
        fs.open(this.writePath, 'a', (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback(null);
            }
        })
    }

    _write(chunk: Buffer, encode: BufferEncoding, callback: CallbackFunc) {
        if (this.fd) {
            fs.write(this.fd, chunk, callback);
        }
    }

    _destroy(err: Error | null, callback: CallbackFunc) {
        if (this.fd) {
            fs.closeSync(this.fd);
        } else {
            callback(err);
        }
    }
}
