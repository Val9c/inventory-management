import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStockAlert]'
})
export class StockAlertDirective {
  @Input() stock: number = 0;
  @Input() threshold: number = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.stock < this.threshold) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      this.renderer.setStyle(this.el.nativeElement, 'fontWeight', 'bold');
    }
  }
}
