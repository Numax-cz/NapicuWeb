import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public valuePercentage = 0;

  public percentageSpeed = 5;

  protected percentageInterval: any = null;

  ngOnInit(): void {
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
