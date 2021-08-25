import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  template: `
    <div class="upload-wrapper">
      <div class="upload-container" (click)="openFileInput()">
        <div class="mask"></div>
        <div class="helper-text">
          <div class="absolute-div">
            <div>
              Upload JSON file
            </div>
          </div>
        </div>
        <input
          #fileinput
          [multiple]="to.multiple"
          id="file-input"
          type="file"
          [formControl]="formControl"
          [formlyAttributes]="field"
          (change)="onChange($event)"
          accept=".json"
          style="display: none"
        />
      </div>
      <div class="file-container">
        <div class="file" *ngFor="let file of selectedFiles; let i = index">
          <ng-container>
            {{ getSanitizedUrl(file) }}
          </ng-container>
          <span (click)="onDelete(i)">X</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./file-type.component.scss']
})
export class FormlyFieldFile extends FieldType implements OnInit {
  @ViewChild('fileinput') el: ElementRef;
  selectedFiles: File[];
  constructor(public sanitizer: DomSanitizer) {
    super();
  }
  ngOnInit(): void {}
  openFileInput() {
    this.el.nativeElement.click();
  }
  onDelete(index) {
    // this.formControl.reset();
    console.log(this.selectedFiles);
    this.selectedFiles.splice(index, 1);

    this.formControl.patchValue(this.selectedFiles);
    console.log('Form Control Value', this.formControl.value);
  }
  onChange(event) {
    this.selectedFiles = Array.from(event.target.files);
    console.log(this.selectedFiles);
  }
  getSanitizedUrl(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
  }
  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }
}
