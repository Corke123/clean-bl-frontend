import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusDirective]',
})
export class StatusDirectiveDirective implements OnInit {
  @Input() status: string;
  @Input() valid: boolean;

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

  ngOnInit(): void {
    switch (this.status) {
      case 'poslan': {
        this.renderer.addClass(this.hostElement.nativeElement, 'sent');
        this.renderer.appendChild(
          this.hostElement.nativeElement.querySelector('mat-icon'),
          this.renderer.createText('insights')
        );
        break;
      }
      case 'u procesu': {
        this.renderer.addClass(this.hostElement.nativeElement, 'in-process');
        this.renderer.appendChild(
          this.hostElement.nativeElement.querySelector('mat-icon'),
          this.renderer.createText('schedule')
        );
        break;
      }
      case 'zavrsen': {
        if (this.valid) {
          this.renderer.addClass(this.hostElement.nativeElement, 'completed');
          this.renderer.appendChild(
            this.hostElement.nativeElement.querySelector('mat-icon'),
            this.renderer.createText('done')
          );
        } else {
          this.renderer.addClass(
            this.hostElement.nativeElement,
            'not-completed'
          );
          this.renderer.appendChild(
            this.hostElement.nativeElement.querySelector('mat-icon'),
            this.renderer.createText('close')
          );
        }
        break;
      }
    }
    this.renderer.appendChild(
      this.hostElement.nativeElement.querySelector('span'),
      this.renderer.createText(this.status)
    );
  }
}
