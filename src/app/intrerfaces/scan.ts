export interface IUrlIdResponse {
  data: IUrlId;
}

export interface IUrlId {
  type: string;
  id: string;
}

export interface IAnalyzeDataResponse {
  data: IAnalyzeData;
}

export interface IAnalyzeData {
  attributes: IAnalyzeAttributes;
}

export interface IAnalyzeAttributes {
  date: Date;
  status: ScanStatus;
  stats: IAnalyzeStats;
  results: IAnalyzeScanner[];
}

export interface IAnalyzeStats {
  harmless: number;
  malicious: number;
  suspicious: number;
  undetected: number;
  timeout: number;
}

export interface IAnalyzeScanner {
  category: string;
  result: string;
  method: string;
  engine_name: string;
}

export const SCAN_CATEGORY = {
  harmless: 'harmless',
  malicious: 'malicious',
  suspicious: 'suspicious',
  undetected: 'undetected',
  timeout: 'timeout'
};

export enum ScanStatus {
  completed = 'completed',
  queued = 'queued'
}
