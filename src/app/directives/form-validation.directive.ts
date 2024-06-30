import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormValidation]',
  standalone: true,
})
export class FormValidationDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input') onInput() {
    const isValid = this.el.nativeElement.checkValidity();
    const parent = this.el.nativeElement.parentElement;
    const invalidField = parent?.querySelector('.invalid-feedback');
    if (!isValid) {
      invalidField?.classList.add('d-block');
      this.el.nativeElement.classList.add('is-invalid');
    } else {
      invalidField?.classList.remove('d-block');
      this.el.nativeElement.classList.remove('is-invalid');
    }
  }

  @HostListener('invalid') onInvalid() {
    const parent = this.el.nativeElement.parentElement;
    const invalidField = parent?.querySelector('.invalid-feedback');
    invalidField?.classList.add('d-block');
    this.el.nativeElement.classList.add('is-invalid');
  }
}
