const { PORT } = require('./common/config');
const { main: app } = require('./app.ts');

app(PORT);
