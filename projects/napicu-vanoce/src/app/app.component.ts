import {Component, OnInit} from '@angular/core';
import {particle_js_config} from "./config";
declare var particlesJS: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  protected christmas_audio: HTMLAudioElement | null = null;

  protected readonly christmas_day_time: number = new Date(`Dec 24, ${this.get_full_year} 00:00:00`).getTime();

  protected days: number = 0;

  protected hours: number = 0;

  protected minutes: number = 0;

  protected seconds: number = 0;

  protected is_christmas_day: boolean = false;


  public ngOnInit(): void {
    this.load_sound();
    this.update_time();
    setInterval(this.update_time, 1000);
    particlesJS('snow', particle_js_config);
  }


  public update_time = (): void => {
    const time: number = new Date().getTime();

    if(time > this.christmas_day_time) this.is_christmas_day= true;
    else {

      let cn_time = this.christmas_day_time - time;

      let s = 1000;
      let m = s * 60;
      let h = m * 60;
      let d = h * 24;

      this.days = Math.floor(cn_time / (d));
      this.hours = Math.floor((cn_time % (d)) / (h)) ;
      this.minutes= Math.floor((cn_time % (h)) / (m));
      this.seconds = Math.floor((cn_time % (m)) / s);

    }
  }

  public play_sound(): void {
    if(this.christmas_audio) this.christmas_audio.play();
  }

  public load_sound(): void {
    if(!this.christmas_audio){
      this.christmas_audio = new Audio("assets/we-wish-you-a-merry-christmas.mp3");
      this.christmas_audio.load();
    }
  }

  get get_full_year(): number{
    return new Date().getFullYear();
  }

  get get_days(): number {
    return this.days;
  }

  get get_hours(): number {
    return this.hours;
  }

  get get_minutes(): number {
    return this.minutes;
  }

  get get_seconds(): number {
    return this.seconds;
  }
}
