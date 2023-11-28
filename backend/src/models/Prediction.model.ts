export type TemperatureUnit = 'G_CEL' | 'G_FAH';

export interface PrecipitationProbability {
  probability: number;
  period: string;
}

export interface Prediction {
  mediumTemperature: number;
  temperatureUnit: TemperatureUnit;
  precipitationProbability: Array<PrecipitationProbability>;
}
