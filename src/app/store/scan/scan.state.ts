import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ApiService } from '../../services/api-service';
import { ClearScanState, GetAnalyzeData, GetAnalyzeDataSuccess, GetUrlId, GetUrlIdSuccess, SetScanType, SetUrl } from './scan.actions';
import { UserState } from '../user/user.state';
import { tap } from 'rxjs/operators';
import { IAnalyzeAttributes, IAnalyzeScanner, IUrlId, ScanStatus } from '../../intrerfaces/scan';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorAction } from '../login/login.actions';
import { Observable } from 'rxjs';
import { ScanType } from '../../pages/scan/scan.const';

export class ScanStateModel {
  scanType: ScanType;
  url: string;
  urlId: string;
  analyzeData: IAnalyzeAttributes;
  message: string;

  public static getInitialState(): ScanStateModel {
    return {
      scanType: ScanType.url,
      url: '',
      urlId: '',
      analyzeData: null,
      message: ''
    };
  }
}

@Injectable()
@State<ScanStateModel>({
  name: 'ScanState',
  defaults: ScanStateModel.getInitialState()
})
export class ScanState {
  constructor(private apiService: ApiService, private store: Store) {
  }

  @Selector()
  public static scanType(state: ScanStateModel): ScanType {
    return state.scanType;
  }

  @Selector()
  public static scannedUrl(state: ScanStateModel): string {
    return state.url;
  }

  @Selector()
  public static analyzeData(state: ScanStateModel): IAnalyzeAttributes {
    return state.analyzeData;
  }

  @Selector()
  public static message(state: ScanStateModel): string {
    return state.message;
  }

  @Action(SetScanType)
  public setScanType(ctx: StateContext<ScanStateModel>, { scanType }: SetScanType): void {
    ctx.patchState({
      scanType
    });
  }

  @Action(SetUrl)
  public setUrl(ctx: StateContext<ScanStateModel>, { url }: SetUrl): void {
    ctx.patchState({
      url
    });
  }

  @Action(GetUrlId)
  public getUrlId(ctx: StateContext<ScanStateModel>, { url }: GetUrlId): Observable<IUrlId> {
    const apiKey = this.store.selectSnapshot<string>(UserState.apiKey);

    return this.apiService.getUrlId(apiKey, url).pipe(
      tap({
        next: (urlId: IUrlId) => ctx.dispatch(new GetUrlIdSuccess(urlId)),
        error: ({ message }: HttpErrorResponse) => ctx.dispatch(new ErrorAction(message))
      })
    );
  }

  @Action(GetUrlIdSuccess)
  public getUrlIdSuccess(ctx: StateContext<ScanStateModel>, { urlId }: GetUrlIdSuccess): void {
    ctx.patchState({
      urlId: urlId.id
    });
  }

  @Action(GetAnalyzeData)
  public getAnalyzeData(ctx: StateContext<ScanStateModel>): Observable<IAnalyzeAttributes> {
    const apiKey = this.store.selectSnapshot<string>(UserState.apiKey);
    const urlId = ctx.getState().urlId;

    return this.apiService.getAnalyzeData(apiKey, urlId).pipe(
      tap({
        next: (analyzeData: IAnalyzeAttributes) => {
          if (analyzeData.status === ScanStatus.queued) {
            return ctx.patchState({
              message: 'Your scan in queue. Please try again later.'
            });
          }

          ctx.dispatch(new GetAnalyzeDataSuccess(analyzeData));
        },
        error: ({ message }: HttpErrorResponse) => ctx.dispatch(new ErrorAction(message))
      })
    );
  }

  @Action(GetAnalyzeDataSuccess)
  public getAnalyzeDataSuccess(ctx: StateContext<ScanStateModel>, { analyzeData }: GetAnalyzeDataSuccess): void {
    analyzeData.date = new Date();

    const scanners: IAnalyzeScanner[] = [];
    for (const scanner in analyzeData.results) {
      if (analyzeData.results.hasOwnProperty(scanner)) {
        scanners.push(analyzeData.results[scanner]);
      }
    }
    analyzeData.results = scanners;

    ctx.patchState({
      analyzeData
    });
  }

  @Action(ClearScanState)
  public clearScanState(ctx: StateContext<ScanStateModel>): void {
    ctx.setState(ScanStateModel.getInitialState());
  }
}
