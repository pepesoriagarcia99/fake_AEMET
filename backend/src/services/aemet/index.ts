import configuration from "../../configuration";
import { AemetPrediction } from "../../models/AemetPrediction.model";
import { AemetTown } from "../../models/AemetTown.model";

const { aemet: {url, apikey} } = configuration;

class AemetService {
  readonly url: string;

  readonly apiKey: string;

  constructor(url: string, apiKey: string) {
    this.url = url;
    this.apiKey = apiKey;
  }

  async getTown(id: string): Promise<Array<AemetTown> | null> {
    const res = await fetch(`${this.url}/maestro/municipio/${id}?api_key=${this.apiKey}`);
    
    if (res.ok) return res.json();
    else if (res.status === 404) return null;

    return Promise.reject({ error: "Something wrong happened" });
  }

  async listTowns(): Promise<Array<AemetTown>> {
    const res = await fetch(`${this.url}/maestro/municipios?api_key=${this.apiKey}`);

    if (res.ok) return res.json();
    return Promise.reject({ error: "Something wrong happened" });
  }

  async timePrediction(id: string): Promise<Array<AemetPrediction>> {
    const res = await fetch(`${this.url}/prediccion/especifica/municipio/horaria/${id}?api_key=${this.apiKey}`);

    if (res.ok) {
      const partialPrediction = await res.json()

      if(partialPrediction.estado === 200) {
        const prediction = await fetch(partialPrediction.datos);
        if(prediction.ok) return prediction.json();
      }
    };
    return Promise.reject({ error: "Something wrong happened" });
  }
}

export default new AemetService(url, apikey);
