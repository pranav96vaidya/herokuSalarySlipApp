import { Directive, Output, EventEmitter, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[salarySlipAppDragDrop]',
  host: {
    '[style.background-color]': 'background',
    '[style.opacity]': 'opacity',
    '[style.cursor]': 'cursor',
    '(mouseover)': 'onMouseOver($event)',
    '(mouseout)': 'onMouseOut($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'ondrop($event)'
  }
})
export class DragDropDirective {
  defaultClass = ' upload-file-container';
  @Input() isFileUploaded;
  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('class')
    className = 'upload-input' + this.defaultClass;

  public onMouseOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.className = 'upload-input-hover' + this.defaultClass;
  }

  public onMouseOut(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.className = 'upload-input-out' + this.defaultClass;
  }

  public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.className = 'upload-input-drag-over' + this.defaultClass;
  }

  public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.className = 'upload-input-drag-leave' + this.defaultClass;
  }

  public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.className = 'upload-input-drop' + this.defaultClass;
    const files = evt.dataTransfer.files;
    this.onFileDropped.emit(files);
  }
}
