import { NextFunction, Response, Request } from 'express';
import { PrecipitationProbability, Prediction, TemperatureUnit } from '../../models/Prediction.model';

import AemetService from '../../services/aemet';

const celsiusToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

export const getNextDayPrediction = ({ params, query }: Request, res: Response, next: NextFunction) => {
  const { town } = params;

  let temperatureUnit: TemperatureUnit = 'G_CEL';
  if(['G_CEL', 'G_FAH', ''].includes(query.temperature_unit as string)) {
    temperatureUnit = query.temperature_unit as TemperatureUnit || 'G_CEL';
  }
  else {
    return res.status(400).json({ message: 'Wrong temperature_unit value' }).end();
  }

  const getValue = (value: string) => {
    if (temperatureUnit === 'G_FAH') {
      return celsiusToFahrenheit(Number(value));
    } else {
      return Number(value);
    }
  };

  return AemetService.timePrediction(town)
    .then((data) => {
      const {temperatura, probPrecipitacion} = data[0].prediccion.dia[1];

      const precipitationProbability: Array<PrecipitationProbability> = probPrecipitacion.map((p) => ({
        probability: Number(p.value),
        period: `${p.periodo.slice(0, 2)}-${p.periodo.slice(2)}`
      }));

      const sumTemperatures = temperatura.reduce(
        (accumulator, item) => accumulator + getValue(item.value),
        0
      );
      const mediumTemperature = Number((sumTemperatures / temperatura.length).toFixed(2));

      const predictionSummary: Prediction = {
        temperatureUnit,
        mediumTemperature,
        precipitationProbability
      };

      res.status(200).json(predictionSummary).end();
    })
    .catch(next);
};
