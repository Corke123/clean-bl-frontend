import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.css'],
})
export class CaptureImageComponent implements AfterViewInit, OnDestroy {
  @Output() image = new EventEmitter<string>();
  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  stream;
  error: any;
  cameraNotAllowed: boolean;
  isCaptured: boolean;
  capturedImg: any;

  constructor() {}

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (this.stream) {
          this.video.nativeElement.srcObject = this.stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.cameraNotAllowed = true;
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.capturedImg = this.canvas.nativeElement.toDataURL('image/png');
    this.isCaptured = true;
    this.emitCapturedImage();
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  onFileSelected(files) {
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);

      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          this.drawImageToCanvas(img);
          this.capturedImg = reader.result;
          this.emitCapturedImage();
        };
        img.src = reader.result.toString();

        this.isCaptured = true;
      };
    }
  }

  emitCapturedImage(): void {
    this.image.emit(this.capturedImg);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop();
    }
  }
}
