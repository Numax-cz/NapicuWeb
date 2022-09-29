import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('NapicuBlueScreenEditModeAnimation', [
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate(200, style({transform: 'scale(1)'})),
      ]),
      transition(':leave', [
        style({transform: 'scale(1)'}),
        animate(200, style({transform: 'scale(0)'})),
      ]),
    ]),

  ]
})
export class AppComponent implements OnInit{

  public emoji = ":(";

  public description = "Your PC ran into a problem and needs to restart. We’re just collecting some error info, and then we’ll restart for you."

  public stopCode = "KERNEL_MODE_HEAP_CORRUPTION";

  public editMode = true;

  public QRCode = "https://napicu.eu";

  public valuePercentage = 0;

  public percentageSpeed = 10;

  protected percentageInterval: any = null;

  public isDeviceMobile: boolean = false;

  public tapedTwice = false;

  ngOnInit() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("touchstart", this.onTouchScreen)
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))this.isDeviceMobile = true;
  }

  public onTouchScreen = (event: TouchEvent): void => {
    if(this.editMode) return;
    if(!this.tapedTwice) {
      this.tapedTwice = true;
      setTimeout( () => { this.tapedTwice = false; }, 300 );
      return;
    }
    this.editMode = true;
    //event.preventDefault();
  }

  public onKeyDown = (event: KeyboardEvent) => {
    if(event.keyCode === 113){
      this.editMode = true;
      this.clearInterval();
      event.preventDefault();
    }
  }

  public exitEditMode(): void {
    this.editMode = false;
    this.percentageInterval = setInterval(() => {
      this.valuePercentage += 1;
      if(this.valuePercentage >= 100) this.clearInterval();
    }, 1000 * this.percentageSpeed);
  }

  protected clearInterval(): void {
    clearInterval(this.percentageInterval);
    this.percentageInterval = null;
  }
}
