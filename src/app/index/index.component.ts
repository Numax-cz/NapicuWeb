import { Component, OnInit, Renderer2 } from '@angular/core';
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

  public MenuEnter(): void {
    //this.isNapicuMenuOpen = true;
  }

  //Button > Menu

  public ButtonMatMenuOpen(trigger: MatMenuTrigger): void {
    setTimeout(() => {
      if (this.ButtonTrigger && this.ButtonTrigger != trigger) {
        this.ButtonTrigger.closeMenu();
        this.ButtonTrigger = trigger;
        this.MenuOpen = false;
        trigger.openMenu();
        //TODO elementRef
      } else if (!this.MenuOpen) {
        this.ButtonOpen = true;
        this.ButtonTrigger = trigger;
        trigger.openMenu();
        //TODO elementRef
      } else {
        this.ButtonOpen = true;
        this.ButtonTrigger = trigger;
      }
    });
  }
  public ButtonMatMenuClose(trigger: MatMenuTrigger, Button: any): void {
    console.log(Button);

    setTimeout(() => {
      if (this.ButtonOpen && !this.MenuOpen) {
        //TDO elementRef
      }
      if (!this.MenuOpen) {
        //TDO elementRef
        trigger.closeMenu();
      } else {
        this.ButtonOpen = false;
      }
    }, 100);
  }
}
