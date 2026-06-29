import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({ selector: '[appResaltarCitaProxima]', standalone: false })
export class ResaltarCitaProximaDirective implements OnInit {
  @Input('appResaltarCitaProxima') fechaCita!: Date | string;
  @Input() horasUmbral: number = 24;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.esCitaProxima()) {
      this.renderer.addClass(this.el.nativeElement, 'cita-proxima');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #ffc107');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff8e1');
    }
  }

  private esCitaProxima(): boolean {
    const fecha = new Date(this.fechaCita);
    const ahora = new Date();
    const diferencia = fecha.getTime() - ahora.getTime();
    const horasDiferencia = diferencia / (1000 * 60 * 60);
    return horasDiferencia >= 0 && horasDiferencia <= this.horasUmbral;
  }
}
