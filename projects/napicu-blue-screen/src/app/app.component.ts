import {Component, OnInit} from '@angular/core';
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


  ngOnInit() {
    window.addEventListener("keydown", this.onKeyDown);
  }


  public onKeyDown = (event: KeyboardEvent) => {
    if(event.keyCode === 113){
      this.editMode = true;
      event.preventDefault();
    }
  }

  public exitEditMode(): void {
    this.editMode = false;
  }


}
