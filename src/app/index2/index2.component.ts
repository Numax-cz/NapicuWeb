import { Target } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-index2',
  templateUrl: './index2.component.html',
  styleUrls: ['./index2.component.scss'],
})
export class Index2Component implements OnInit {

  constructor(private ren: Renderer2) {
    //Todo items
  }
  public MenuOpen: boolean = false;

  public readonly DiscordName: string = 'Numax#6286';
  //TODO Move (1)

  @ViewChild('Burger') protected declare Burger: ElementRef;
  @ViewChild('NavMenu') protected declare NavMenu: ElementRef;
  @ViewChild('DiscordLink') protected declare DiscordLink: ElementRef;

  ngOnInit(): void {
    //this.LoadParticles();
  }
  ngAfterViewInit(): void {
    this.Burger.nativeElement.addEventListener('click', () => {
      this.NavMenu.nativeElement.classList.toggle('is-active');
      this.MenuOpen = !this.MenuOpen ? true : false;
    });
  }

  public copyID(): void {
    navigator.clipboard.writeText(this.DiscordName);
    // this.DiscordLink.nativeElement.classList.add('NapicuButtonHover');
  }

  get year(): string {
    return new Date().getFullYear().toString();
  }
}
