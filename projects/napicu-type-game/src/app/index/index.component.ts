import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordsAPI } from 'api';
import { timer_minutes, timer_seconds } from './timerConfig';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
declare interface words {
  value: string;
  mistake: boolean;
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('cursor', [
      state(
        'true',
        style({
          background: '#dbdbdb',
        })
      ),
      transition(`*=>*`, animate(200)),
    ]),
  ],
})
export class IndexComponent implements OnInit {

  public displayTime: boolean = true;

  public readonly maxWords: number = 300;

  public selectedWordIndex: number = 0;

  public declare inputValue: string | null;

  public declare words: words[];

  public declare launched: boolean;

  public declare noMove: boolean;

  public declare timer: any;

  public declare exportData: any;

  public declare previousWordPosition: number;

  constructor(private http: HttpClient) {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.keyCode == 32) this.onSpaceBar(e);
    });
  }

  public restart(): void {
    this.selectedWordIndex = 0;
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
    return this.words[this.selectedWordIndex];
  }

  public onSpaceBar(e: KeyboardEvent): void {
    if (this.noMove || !this.inputValue?.length) return;
    var element = document
      .getElementsByClassName(`napicuWord-${this.selectedWordIndex + 1}`)
      .item(0) as HTMLElement;

    if (this.previousWordPosition < element.offsetTop) {
      this.words.splice(0, this.selectedWordIndex + 1);
      this.selectedWordIndex = -1;
    }
    this.previousWordPosition = element.offsetTop;

    if (this.inputValue?.indexOf(' ') != 0) {
      this.checkFullText();
      this.inputValue = null;
      this.selectedWordIndex += 1;
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

  public checkFullText(): void {
    var selectedWord = this.getSelecteWord();
    if (!selectedWord) return;
    if (selectedWord.value.length !== this.inputValue?.length) {
      selectedWord.mistake = true;
    }
  }

  public getWords(): void {
    this.words = [];
    this.http.get<any>(`${WordsAPI}?pocet=${this.maxWords}`).subscribe((data: string[]) => {
      data.forEach((i: string) => {
        this.words.push({ value: i, mistake: false });
      });
    });
  }

  public timeDisplay(): void {
    this.displayTime = this.displayTime ? false : true;
  }
}
