import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[DragNDrop]'
})
export class DragNDropDirective {


  @HostBinding('class.fileover') fileOver: boolean;
  @HostBinding('style.background-color') private background: string = '#f5fcff';
  @HostBinding('style.opacity') private opacity: number = 1;

  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(e) {
    this.preventDefaults(e);
    this.updateContainerView('#9ecbec', 0.6);
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) onDragLeave(e) {
    this.preventDefaults(e);
    this.updateContainerView('#f5fcff', 1);
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) ondrop(e) {
    this.preventDefaults(e);
    this.updateContainerView('#f5fcff', 1);
    this.fileOver = false;
    let files = e.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  private preventDefaults(e): void {
    e.preventDefault();
    e.stopPropagation();
  }

  private updateContainerView(background, opacity): void {
    this.background = background;
    this.opacity = opacity;
  }

}
