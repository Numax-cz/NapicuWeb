import {Component, OnInit} from '@angular/core';
import {timer_minutes, timer_seconds} from './config';
import {animate, style, transition, trigger} from '@angular/animations';
import {exportDataIn, inputValueIn, words, wordsLetter} from './interface';
import {NapicuTypeGameControllerService} from "@Napicu/OpenAPI/api/napicuTypeGameController.service";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('window', [
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate(150, style({transform: 'scale(1)'})),
      ]),
      transition(':leave', [
        style({transform: 'scale(1)'}),
        animate(150, style({transform: 'scale(0)'})),
      ]),
    ]),
  ],
})
export class IndexComponent implements OnInit {
  public displayScore: boolean = false;

  public displayTime: boolean = true;

  public apiWords: words[] = [];

  public readonly wordsCount: number = 300;

  public selectedWordIndex: number = 0;

  public declare inputValue: inputValueIn;

  public declare launched: boolean;

  public declare noMove: boolean;

  public declare timer: any;

  public apiError: boolean = false;

  public loadingRetry: boolean = false;

  public declare exportData: exportDataIn;

  public declare previousWordPosition: number;

  constructor(private service: NapicuTypeGameControllerService) {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.keyCode == 32) this.onSpaceBar(e);
    });
    this.clickRestart();
  }

  public clickRestart(): void {
    this.selectedWordIndex = 0;
    this.inputValue = null;
    this.displayScore = false;
    this.noMove = false;
    this.timer = {
      minutes: timer_minutes,
      seconds: timer_seconds,
    };
    this.exportData = {
      wrongWords: 0,
      wrongLetters: 0,
      letters: 0,
      words: 0,
    };

    this.loadApiData();
  }

  ngOnInit(): void {
  }

  public start(): void {
    if (!this.launched) {
      this.launched = true;
    }

    this.clickRestart();
    this.setTimer();
  }

  public onEnd(): void {
    this.noMove = true;
    this.launched = false;
    this.displayScore = true;
  }

  protected getWPM(): number {
    return Math.round(this.exportData.letters / 5 / timer_minutes + (timer_seconds % 3600) / 60);
  }

  protected getAccurately(): number {
    return Math.round(
      (this.exportData.letters - this.exportData.wrongLetters) / (this.exportData.letters / 100)
    );
  }

  public getSelecteWord(): words {
    return this.apiWords[this.selectedWordIndex];
  }

  public onSpaceBar(e: KeyboardEvent): void {
    if (this.noMove || !this.inputValue?.length) return;
    var element = document
      .getElementsByClassName(`napicuWord-${this.selectedWordIndex + 1}`)
      .item(0) as HTMLElement;

    if (this.previousWordPosition < element.offsetTop) {
      this.apiWords.splice(0, this.selectedWordIndex + 1);
      this.selectedWordIndex = -1;
    }
    this.previousWordPosition = element.offsetTop;

    if (this.inputValue?.indexOf(' ') != 0) {
      this.checkFullText();
      if (this.getSelecteWord()?.mistake) {
        this.exportData.wrongWords += 1;
      } else {
        this.exportData.words += 1;
      }

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

  public retry = (): void => {
    this.loadApiData();
  }


  public onInputChange(e: string): void {
    if (!this.launched) this.start();
    if (this.noMove) return;
    this.checkMistakes();

    var letter: wordsLetter = this.getSelecteWord().letters[e.length - 1];

    if (letter) {
      if (this.getSelecteWord().mistake && letter.mistake == null) {
        this.exportData.wrongLetters += 1;
        letter.mistake = false;
      } else if (letter.mistake == null) {
        this.exportData.letters += 1;
        letter.mistake = true;
      }
    }
  }

  public checkMistakes(): void {
    var selectedWord = this.getSelecteWord();
    var returnValue = false;
    if (this.inputValue && selectedWord) {
      const inputLetters = this.inputValue.split('');
      const selectedLetters = selectedWord.value?.split('');
      inputLetters.forEach((sL: string, index: number) => {
        if (sL !== selectedLetters[index]) {
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

  public async loadApiData(): Promise<void> {
    this.loadingRetry = true;
    await this.service.getWords(this.wordsCount).toPromise()
      .then((data: string[] | undefined) => {
        if(data) this.setWords(data);
      })
      .catch((error) => {
        this.apiError = true;
        });

    this.loadingRetry = false;

  }

  protected setWords(words: string[]): void {
    this.apiWords = [];
    words.forEach((i: string) => {
      var value: wordsLetter[] = [];
      i.split('').forEach((element: string) => {
        value.push({value: element, mistake: null});
      });
      this.apiWords.push({value: i, mistake: false, letters: value});
    });
    this.apiError = false;
  }

  public timeDisplay(): void {
    this.displayTime = !this.displayTime;
  }

  get wrongWords(): number {
    return this.exportData.wrongWords;
  }

  get wrongLetters(): number {
    return this.exportData.wrongLetters;
  }

  get letters(): number {
    return this.exportData.letters;
  }

  get words(): number {
    return this.exportData.words;
  }

  get wpm(): number {
    return this.getWPM();
  }

  get accurately(): number {
    return this.getAccurately();
  }
}
