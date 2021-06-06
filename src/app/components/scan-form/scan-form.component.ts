import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormControlErrorMessage } from '../../utils';
import { ScanType } from '../../pages/scan/scan.const';
import { Select } from '@ngxs/store';
import { UserState } from '../../store/user/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scan-form',
  templateUrl: './scan-form.component.html',
  styleUrls: ['./scan-form.component.scss']
})
export class ScanFormComponent {
  @Select(UserState.isLogin) isLogin$: Observable<boolean>;

  @Input() public scanType: ScanType;

  @Output() public setScanTypeEvent: EventEmitter<ScanType> = new EventEmitter<ScanType>();

  @ViewChild('urlInputContainer') public urlInputContainer: ElementRef;

  public form: FormGroup;

  public get url(): AbstractControl {
    return this.form.controls.url;
  }

  constructor(private renderer: Renderer2) {
    const urlRegExp: RegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    // TODO add support scan files
    this.form = new FormGroup({
      url: new FormControl('', [Validators.required, Validators.pattern(urlRegExp)])
    });
  }

  public getErrorMessage(control: AbstractControl, controlName: string): string {
    return getFormControlErrorMessage(control, controlName);
  }

  public addUrlInputContainerClass(cssClass: string): void {
    this.renderer.addClass(this.urlInputContainer.nativeElement, cssClass);
  }

  public removeUrlInputContainerClass(cssClass: string): void {
    this.renderer.removeClass(this.urlInputContainer.nativeElement, cssClass);
  }

  public submitScan(): void {

  }

  public setScanType(scanType: string): void {
    if (scanType === this.scanType) {
      return;
    }
    this.setScanTypeEvent.emit(scanType as ScanType);
  }
}
