import { Component, OnInit, QueryList, Renderer2 } from '@angular/core';
import { MatMenuItem, MatMenuPanel } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu/menu-trigger';

import { ParticlesConfig } from './particles-config';
declare let particlesJS: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  MenuOpen: boolean = false;
  ButtonOpen: boolean = false;
  ButtonTrigger: any;
  ngOnInit(): void {
    this.LoadParticles();
  }
  constructor(private ren: Renderer2) {
    //Todo items
  }

  public LoadParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () {});
  }

  public MatMenuOpen(): void {
    this.MenuOpen = true;
  }

  public MatMenuClose(trigger: MatMenuTrigger, button: any): void {
    setTimeout(() => {
      if (!this.ButtonOpen) {
        this.MenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.MenuOpen = false;
      }
    }, 80);
  }

  public ButtonMatMenuOpen(trigger: MatMenuTrigger): void {
    setTimeout(() => {
      if (this.ButtonTrigger && this.ButtonTrigger != trigger) {
        this.ButtonTrigger.closeMenu();
        this.ButtonTrigger = trigger;
        this.MenuOpen = false;
        trigger.openMenu();
      } else if (!this.MenuOpen) {
        this.ButtonOpen = true;
        this.ButtonTrigger = trigger;
        trigger.openMenu();
      } else {
        this.ButtonOpen = true;
        this.ButtonTrigger = trigger;
      }
    });
  }
  public ButtonMatMenuClose(trigger: MatMenuTrigger, button: any): void {
    setTimeout(() => {
      if (this.ButtonOpen && !this.MenuOpen) {
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      }
      if (!this.MenuOpen) {
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
        trigger.closeMenu();
      } else {
        this.ButtonOpen = false;
      }
    }, 100);
  }
}
