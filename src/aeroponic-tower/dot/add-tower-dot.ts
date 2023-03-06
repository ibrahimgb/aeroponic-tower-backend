export type AddAeroponicTowerDot = {
  size: number;
  content: string;
  PumpIntervalID: number;
};

export type changePumpIntervalDto = {
  AeroponicTowerID: number;
  timeOff: number;
  timeOn: number;
};
