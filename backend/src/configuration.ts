interface Configuration {
  env: string;
  ip: string;
  port: number;
  apiRoot: string;
  aemet: {
    url: string;
    apikey: string;
  }
}

export default {
  env: process.env.NODE_ENV || "development",
  ip: process.env.IP || "0.0.0.0",
  port: Number(process.env.PORT) || 9000,
  apiRoot: process.env.API_ROOT || "/",
  aemet: {
    url: "https://opendata.aemet.es/opendata/api",
    apikey: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXBlc29yaWFnYXJjaWE5OUBnbWFpbC5jb20iLCJqdGkiOiJlNTQ1ZTFhNS01YmUyLTQwZDAtYTQwZC1hZmM5NDg2ODc3NTAiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcwMDU3NDM1NSwidXNlcklkIjoiZTU0NWUxYTUtNWJlMi00MGQwLWE0MGQtYWZjOTQ4Njg3NzUwIiwicm9sZSI6IiJ9.aHVMOLQ36I8P8OivSjIHGFTG0sqoATKeubWIIBOn3cA",
  },
} as Configuration;
