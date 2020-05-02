import 'reflect-metadata';
import express from 'express';

import './database';
import routes from './routes';
import uploadConfig from './config/upload';

const app = express();

app.use(express.json());

app.use(routes);

app.use('/files', express.static(uploadConfig.directory));

app.listen(3333, () => {
  console.log('listening on port :3333 🎈🎈🎈🎈');
});
