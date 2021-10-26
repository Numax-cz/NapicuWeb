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

  //TODO Move (1)

  @ViewChild('Burger') protected declare Burger: ElementRef;
  @ViewChild('NavMenu') protected declare NavMenu: ElementRef;

  ngOnInit(): void {
    //this.LoadParticles();
  }
  ngAfterViewInit(): void {
    this.Burger.nativeElement.addEventListener('click', () => {
      this.NavMenu.nativeElement.classList.toggle('is-active');
      this.MenuOpen = !this.MenuOpen ? true : false;
    });
  }
}
