import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private ren: Renderer2) {
    //Todo items
  }

  public MenuOpen: boolean = false;

  public readonly Email: string = 'numax@napicu.eu';
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
      this.MenuOpen = !this.MenuOpen;
    });
  }

  public copyID(): void {
    navigator.clipboard.writeText(this.Email);
    // this.DiscordLink.nativeElement.classList.add('NapicuButtonHover');
  }

  get year(): string {
    return new Date().getFullYear().toString();
  }
}
