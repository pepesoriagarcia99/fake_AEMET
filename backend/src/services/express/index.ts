import express, { Application, Router } from 'express';

import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import configuration from '../../configuration';

class Express {
  #app: Application;

  constructor(apiRoot: string, routes: Router) {
    const app = express();

    if (configuration.env === 'production' || configuration.env === 'development') {
      app.use(cors());
      app.use(compression());
      app.use(morgan('dev'));
    }
    app.use(express.json());
    app.use(apiRoot, routes);

    this.#app = app;
  }

  get app(): Application {
    return this.#app;
  }
}

export default Express;
