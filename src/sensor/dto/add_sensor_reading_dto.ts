export class SensorData {
  AeroponicTowerId: string;

  waterTemperature: number;

  envTempAndHumidity: {
    temperature: number;
    humidity: number;
  };
  insideTempAndHumidity: {
    temperature: number;
    humidity: number;
  };
  uvLight: number;
  waterNeedsRefilling: boolean;
  pumpIsWorking: boolean;
  epochTime: number;
}
