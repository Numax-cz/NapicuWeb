import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordsAPI } from 'api';
import { timer_minutes, timer_seconds } from './timerConfig';
declare interface words {
  value: string;
  mistake: boolean;
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public readonly maxWords: number = 300;

  public selectedWord: number = 0;

  public declare inputValue: string | null;

  public declare words: words[];

  public declare launched: boolean;

  public declare noMove: boolean;

  public declare timer: any;

  // public mistakesArray: words[] = [];

  public declare exportData: any;

  constructor(private http: HttpClient) {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.keyCode == 32) this.onSpaceBar(e);
    });
  }

  public restart(): void {
    this.selectedWord = 0;
    this.inputValue = null;
    this.noMove = false;
    this.timer = {
      minutes: timer_minutes,
      seconds: timer_seconds,
    };
    this.exportData = {
      allMistakes: 0,
    };
  }

  ngOnInit(): void {
    this.restart();
    this.getWords();
  }

  public start(): void {
    if (!this.launched) {
      this.launched = true;
    }
    this.restart();
    this.setTimer();
  }
  public onEnd(): void {
    this.noMove = true;
    this.launched = false;
  }

  public checkWordFromInput(): void {}

  public getSelecteWord(): words {
    return this.words[this.selectedWord];
  }

  public onSpaceBar(e: KeyboardEvent): void {
    if (this.noMove) return;
    if (this.inputValue?.indexOf(' ') != 0) {
      this.inputValue = null;
      this.selectedWord += 1;
      e.preventDefault();
    }
  }

  protected setTimer(): void {
    var timer = setInterval(() => {
      if (this.timer.seconds <= 0 && this.timer.minutes <= 0) {
        this.onEnd();
        clearInterval(timer);
        return;
      }
      if (this.timer.seconds <= 0) {
        this.timer.seconds = 60;
        this.timer.minutes = 0;
      }
      this.timer.seconds--;
    }, 1000);
  }
  public apiGetError(): void {}

  public onInputChange(e: Event): void {
    if (!this.launched) this.start();
    if (this.noMove) return;
    this.checkMistakes();
  }

  public checkMistakes(): void {
    var selectedWord = this.getSelecteWord();
    var returnValue = false;
    if (this.inputValue && selectedWord) {
      const inputLetters = this.inputValue.split('');
      const selectedLetters = selectedWord.value?.split('');
      inputLetters.forEach((sL: string, index: number) => {
        if (sL !== selectedLetters[index]) {
          this.exportData.allMistakes += 1;
          returnValue = true;
          return;
        }
      });
    }
    selectedWord.mistake = returnValue;
  }

  public getWords(): void {
    this.words = [];
    this.http.get<any>(`${WordsAPI}?pocet=${this.maxWords}`).subscribe((data: string[]) => {
      data.forEach((i: string) => {
        this.words.push({ value: i, mistake: false });
      });
    });
    console.log(this.words);
  }
}
