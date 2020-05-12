/* eslint-disable import/no-mutable-exports */
import * as config from '../config/config';
import app from './app';
import logger from '../config/logger';
import * as database from '../config/connection';

let server;

async function startServer() {
  try {
    await database.connect(config.MONGODB_URI);

    server = app.listen(config.PORT || 3333);

    logger.info(
      `App is running 🏎💨 at http://localhost:${config.PORT} in ${app.get(
        'env',
      )} mode`,
    );
    logger.info('  Press CTRL-C to stop\n');
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

startServer().catch(x => console.error(x));

export const stopServer = async () => {
  await database.disconnect();
  server.close();
};

export default server;
