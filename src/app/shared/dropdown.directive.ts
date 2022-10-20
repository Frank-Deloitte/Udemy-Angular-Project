import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') toogleOpenMenu: boolean = false;
  @HostListener('document:click', ['$event']) showDropdown(event: Event) {
    this.toogleOpenMenu = this.elementRef.nativeElement.contains(event.target)
      ? !this.toogleOpenMenu
      : false;
  }

  constructor(private elementRef: ElementRef) {}
}
