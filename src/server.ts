import config from './common/config';
import app from './app';

console.log('config', config);

const port = config.PORT || 4000;

app(port);
