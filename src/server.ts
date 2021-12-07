import config from './common/config';
import app from './app';

const port = config.PORT || 4000;

app(port);
