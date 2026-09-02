import 'dotenv/config';

import { createApp } from './app.js';

const port = Number.parseInt(process.env.PORT ?? '8080', 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

const app = createApp();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
