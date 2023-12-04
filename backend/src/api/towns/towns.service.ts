import { NextFunction, Response, Request } from 'express';

import AemetService from '../../services/aemet';
import { cache } from '../../services/cache';
// import pagination from '../../services/pagination';

import { Town } from '../../models/Town.model';
import { AemetTown } from '../../models/AemetTown.model';

export const listTowns = (
  { query, originalUrl }: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name: string = (query.name as string) ?? '';

  return AemetService.listTowns()
    .then((aemetTowns) => {
      const towns: Array<Town> =
        aemetTowns
          .filter((t: AemetTown) => t.nombre.toLowerCase().includes(name.toLowerCase()))
          .map((t: AemetTown) => ({ code: t.id.replace('id', ''), name: t.nombre }));

      if (!cache.has(originalUrl)) {
        cache.set(originalUrl, towns);
      }
      res.status(200).json(towns).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
};
