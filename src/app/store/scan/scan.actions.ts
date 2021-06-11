import { IAnalyzeAttributes, IUrlId } from '../../intrerfaces/scan';
import { ScanType } from '../../pages/scan/scan.const';

const enum Actions {
  SetScanType = '[Scan] SetScanType',
  SetUrl = '[Scan] SetUrl',
  GetUrlId = '[Scan API] GetUrlId',
  GetAnalyzeData = '[Scan Api] GetAnalyzeData',
  GetUrlIdSuccess = '[Scan] GetUrlIdSuccess',
  GetAnalyzeDataSuccess = '[Scan] GetAnalyzeDataSuccess',
  ClearScanState = '[Scan] ClearScanState',
}

export class SetScanType {
  public static readonly type = Actions.SetScanType;

  constructor(public readonly scanType: ScanType) {
  }
}

export class SetUrl {
  public static readonly type = Actions.SetUrl;

  constructor(public readonly url: string) {
  }
}

export class GetUrlId {
  public static readonly type = Actions.GetUrlId;

  constructor(public readonly url: string) {
  }
}

export class GetUrlIdSuccess {
  public static readonly type = Actions.GetUrlIdSuccess;

  constructor(public readonly urlId: IUrlId) {
  }
}

export class GetAnalyzeData {
  public static readonly type = Actions.GetAnalyzeData;
}

export class GetAnalyzeDataSuccess {
  public static readonly type = Actions.GetAnalyzeDataSuccess;

  constructor(public readonly analyzeData: IAnalyzeAttributes) {
  }
}

export class ClearScanState {
  public static readonly type = Actions.ClearScanState;
}
