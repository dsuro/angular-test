import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appRowHover]'
})
export class RowHoverDirective {

  constructor() {
  }
  @HostBinding("style.background-color") backgroundColor: string;
  
  @HostListener('mouseover') onMouseOver() { 
    this.backgroundColor="gray";
  }
  @HostListener('mouseout') onMouseOut() {
    this.backgroundColor="white";
  }
}
