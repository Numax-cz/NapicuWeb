import { MatMenuTrigger } from '@angular/material/menu/menu-trigger';
import { IndexComponent } from '../../index.component';

export function ButtonOpen(trigger: MatMenuTrigger): void {
  setTimeout(() => {
    if (
      IndexComponent.ButtonTrigger &&
      IndexComponent.ButtonTrigger != trigger
    ) {
      IndexComponent.ButtonTrigger.closeMenu();
      IndexComponent.ButtonTrigger = trigger;
      IndexComponent.MenuOpen = false;
      trigger.openMenu();
    } else if (!IndexComponent.MenuOpen) {
      IndexComponent.ButtonOpen = true;
      IndexComponent.ButtonTrigger = trigger;
      trigger.openMenu();
    } else {
      IndexComponent.ButtonOpen = true;
      IndexComponent.ButtonTrigger = trigger;
    }
  });
}
