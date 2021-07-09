import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu/menu-trigger';

import { ParticlesConfig } from './particles-config';
declare let particlesJS: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  isNapicuMenuOpen: boolean = false;
  isEnteredButton: boolean = false;
  ngOnInit(): void {
    this.LoadParticles();
  }
  constructor(private ren: Renderer2) {
    //Todo items
  }

  public LoadParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }



  public MenuEnter(): void {
    this.isNapicuMenuOpen = true;
  }

  public MenuLeave(NapicuMenuTrigger: MatMenuTrigger, ab: any): void {

    setTimeout(() => {
      if (!this.isNapicuMenuOpen && !this.isEnteredButton) {
        this.isNapicuMenuOpen = false;
        NapicuMenuTrigger.closeMenu();


        this.ren.removeClass(
          ab['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          ab['_elementRef'].nativeElement,
          'cdk-program-focused'
        );

      } else {
        this.isNapicuMenuOpen = false;
      }

    }, 80)
  }


  public ButtonMatMenuOpen(NapicuMenuTrigger: any): void {
    NapicuMenuTrigger.openMenu();
    //HERE


  }

  public ButtonMatMenuClose(NapicuMenuTrigger: MatMenuTrigger, ab: any): void {

    setTimeout(() => {
      if (!this.isNapicuMenuOpen) {
        NapicuMenuTrigger.closeMenu();
        this.ren.removeClass(
          ab['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          ab['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isEnteredButton = false;
      }
    }, 100)
  }









}

