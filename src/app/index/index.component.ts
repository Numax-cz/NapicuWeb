import { MatMenuTrigger } from '@angular/material/menu/menu-trigger';
import {
Component,
  OnInit,
  Renderer2,
} from '@angular/core';

import { ButtonClose } from './Menu/Button/ButtonClose';
import { ButtonOpen } from './Menu/Button/ButtonOpen';
import { MenuClose } from './Menu/Menu/MenuClose';
import { OpenMenu } from './Menu/Menu/MenuOpen';

import { ParticlesConfig } from './particles-config';
declare let particlesJS: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  static MenuOpen: boolean = false;
  static ButtonOpen: boolean = false;
  static ButtonTrigger: any;

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
    OpenMenu();
  }

  public MatMenuClose(trigger: MatMenuTrigger, button: any): void {
    MenuClose(trigger, button, this.ren);
  }

  public ButtonMatMenuOpen(trigger: MatMenuTrigger): void {
    ButtonOpen(trigger);
  }

  public ButtonMatMenuClose(trigger: MatMenuTrigger, button: any): void {
    ButtonClose(trigger, button, this.ren);
  }
}
