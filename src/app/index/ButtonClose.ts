import { Renderer2 } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { IndexComponent } from './index.component';

export function ButtonClose(
  trigger: MatMenuTrigger,
  button: any,
  ren: Renderer2
): void {
  setTimeout(() => {
    if (IndexComponent.ButtonOpen && !IndexComponent.MenuOpen) {
      trigger.closeMenu();
      ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
      ren.removeClass(
        button['_elementRef'].nativeElement,
        'cdk-program-focused'
      );
    }
    if (!IndexComponent.MenuOpen) {
      ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
      ren.removeClass(
        button['_elementRef'].nativeElement,
        'cdk-program-focused'
      );
      trigger.closeMenu();
    } else {
      IndexComponent.ButtonOpen = false;
    }
  }, 100);
}
