import { MatMenuTrigger } from '@angular/material/menu/menu-trigger';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { ParticlesConfig } from './particles-config';
declare let particlesJS: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, AfterViewInit {
  constructor(private ren: Renderer2) {
    //Todo items
  }
  public MenuOpen: boolean = false;

  //TODO Move (1)

  @ViewChild('Burger') protected declare Burger: ElementRef;
  @ViewChild('NavMenu') protected declare NavMenu: ElementRef;

  ngOnInit(): void {
    //this.LoadParticles();
  }
  ngAfterViewInit(): void {
    this.Burger.nativeElement.addEventListener('click', () => {
      this.NavMenu.nativeElement.classList.toggle('is-active');
      this.MenuOpen = (!this.MenuOpen) ? true : false;
    });
  }

  public LoadParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () {});
  }
}
