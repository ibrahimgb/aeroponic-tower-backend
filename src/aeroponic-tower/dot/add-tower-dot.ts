export type AddAeroponicTowerDot = {
  size: number;
  content: string;
  PumpIntervalID: number;
};

export type changePumpIntervalDto = {
  AeroponicTowerID: string;
  timeOff: number;
  timeOn: number;
};
