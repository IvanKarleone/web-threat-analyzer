import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormControlErrorMessage } from '../../utils';
import { ScanType } from '../../pages/scan/scan.const';

@Component({
  selector: 'app-scan-form',
  templateUrl: './scan-form.component.html',
  styleUrls: ['./scan-form.component.scss']
})
export class ScanFormComponent {
  @Input() public scanType: ScanType = ScanType.url;
  @Input() public isLogin: boolean = false;
  @Input() public scanMessage: string = '';

  @Output() public setScanTypeEvent: EventEmitter<ScanType> = new EventEmitter<ScanType>();
  @Output() public scanUrlEvent: EventEmitter<string> = new EventEmitter<string>();
  // TODO implement support scan files
  // @Output() public scanFileEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('urlInputContainer') public urlInputContainer: ElementRef;

  public form: FormGroup;

  public get url(): AbstractControl {
    return this.form.controls.url;
  }

  constructor(private renderer: Renderer2) {
    const urlRegExp: RegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    // TODO implement support scan files
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
    if (this.form.invalid) {
      return;
    }

    if (this.scanType === ScanType.url) {
      this.scanUrlEvent.emit(this.url.value);
    }
    if (this.scanType === ScanType.file) {
      // TODO implement support scan files
      // this.scanFileEvent.emit(this.file.value);
    }
  }

  public setScanType(scanType: string): void {
    if (scanType === this.scanType) {
      return;
    }
    this.scanMessage = '';
    this.setScanTypeEvent.emit(scanType as ScanType);
  }
}
