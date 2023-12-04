import iconv from 'iconv-lite';


import { AemetPrediction } from "../../models/AemetPrediction.model";
import { AemetTown } from '../../models/AemetTown.model';

import configuration from "../../configuration";
const { aemet: { url, apikey } } = configuration;

class AemetService {
  readonly url: string;

  readonly apiKey: string;

  constructor(url: string, apiKey: string) {
    this.url = url;
    this.apiKey = apiKey;
  }

  // Array<AemetTown>
  async listTowns(): Promise<Array<AemetTown>> {
    const res = await fetch(`${this.url}/maestro/municipios?api_key=${this.apiKey}`, {
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain;charset=ISO-8859-15',
        'Accept-Charset': 'ISO-8859-15'
      }
    });

    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const data = iconv.decode(Buffer.from(buffer), 'ISO-8859-15');

      return JSON.parse(data)
    }

    return Promise.reject({ error: "Something wrong happened" });
  }

  async timePrediction(id: string): Promise<Array<AemetPrediction>> {
    const res = await fetch(`${this.url}/prediccion/especifica/municipio/horaria/${id}?api_key=${this.apiKey}`);

    if (res.ok) {
      const partialPrediction = await res.json()

      if (partialPrediction.estado === 200) {
        const prediction = await fetch(partialPrediction.datos);
        if (prediction.ok) return prediction.json();
      }
    };
    return Promise.reject({ error: "Something wrong happened" });
  }
}

export default new AemetService(url, apikey);
