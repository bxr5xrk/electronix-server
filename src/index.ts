import { app } from './app';
import { config } from './config';
import { createConnection } from './db';

const { PORT } = config;

createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
