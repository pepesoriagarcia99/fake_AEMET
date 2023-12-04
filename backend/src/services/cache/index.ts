import { NextFunction, Response, Request } from 'express';

import NodeCache from 'node-cache';
export const cache = new NodeCache({ stdTTL: 100 });

export default ({ headers, originalUrl }: Request, res: Response, next: NextFunction): void => {
  const force: boolean = headers.force ? JSON.parse(headers.force as string) : false;

  if (force || !cache.has(originalUrl)) {
    next();
  } else {
    res.send(cache.get(originalUrl)).end();
  }
};
