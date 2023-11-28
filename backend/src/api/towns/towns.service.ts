import { NextFunction, Response, Request } from 'express';
import AemetService from '../../services/aemet';
import { Town } from '../../models/Town.model';

export const listTowns = ({ query }: Request, res: Response, next: NextFunction): Promise<void> => {
  const name: string = (query.name as string) ?? '';

  return AemetService.listTowns()
    .then((aemetTowns) => {
      const towns: Array<Town> = aemetTowns
        .filter((t) => t.nombre.toLowerCase().includes(name.toLowerCase()))
        .map((t) => ({ code: t.id.replace('id', ''), name: t.nombre }));

      res.status(200).json(towns).end();
    })
    .catch(next);
};

export const getOneTown = ({ params }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = params;
  return AemetService.getTown(id)
    .then((town) => {
      if (!town || (Array.isArray(town) && town.length === 0)) {
        res.status(404).end();
        return;
      }
      const { id, nombre } = town[0];
      res.json({ code: id, name: nombre }).end();
    })
    .catch(next);
};
