import { Renderer2 } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu/menu-trigger';
import { IndexComponent } from '../../index.component';

export function MenuClose(
  trigger: MatMenuTrigger,
  button: any,
  ren: Renderer2
): void {
  setTimeout(() => {
    if (!IndexComponent.ButtonOpen) {
      IndexComponent.MenuOpen = false;
      trigger.closeMenu();
      ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
      ren.removeClass(
        button['_elementRef'].nativeElement,
        'cdk-program-focused'
      );
    } else {
      IndexComponent.MenuOpen = false;
    }
  }, 80);
}
