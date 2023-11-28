interface BasicItem {
    value: string;
    periodo: string;
}

interface Item {
    value: string;
    periodo: string;
    descripcion: string;
}

interface PredictionDay {
    estadoCielo: Array<Item>,
    precipitacion: Array<BasicItem>,
    probPrecipitacion: Array<BasicItem>,
    probTormenta: Array<BasicItem>,
    nieve: Array<BasicItem>,
    probNieve: Array<BasicItem>,
    temperatura: Array<BasicItem>,
    sensTermica: Array<BasicItem>,
    humedadRelativa: Array<BasicItem>,
    vientoAndRachaMax: Array<any>,
    fecha: string,
    orto: string,
    ocaso: string
}

export interface AemetPrediction {
    origen: {
        productor: string,
        web: string,
        enlace: string,
        language: string,
        copyright: string,
        notaLegal:string,
    },
    elaborado: string,
    nombre: string,
    provincia: string,
    prediccion: {
        dia: Array<PredictionDay>
    },
    id: string,
    version: string,
}
