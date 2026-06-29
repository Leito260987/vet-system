import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appAutoFocus]', standalone: false })
export class AutoFocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void { setTimeout(() => this.el.nativeElement.focus(), 100); }
}
