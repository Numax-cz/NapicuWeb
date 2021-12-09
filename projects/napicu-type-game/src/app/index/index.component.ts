import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordsAPI } from 'api';
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

  public words: words[] = [];

  // public mistakesArray: words[] = [];

  public exportData = {
    mistakes: 0,
  };

  constructor(private http: HttpClient) {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.keyCode == 32) this.onSpaceBar(e);
    });
  }

  ngOnInit(): void {
    this.selectedWord = 0;

    this.getWords();
  }

  public onStart(): void {}
  public onEnd(): void {}

  public checkWordFromInput(): void {}

  public getSelecteWord(): words {
    return this.words[this.selectedWord];
  }

  public onSpaceBar(e: KeyboardEvent): void {
    if (this.inputValue?.indexOf(' ') != 0) {
      this.inputValue = null;
      this.selectedWord += 1;
      e.preventDefault();
    }
  }

  public apiGetError(): void {}

  public showWindow(): void {}

  public onInputChange(e: Event): void {
    var selectedWord = this.getSelecteWord();
    if (!this.inputValue || !selectedWord) {
      selectedWord.mistake = false;
    } else {
      const indexInputLetter = this.inputValue.length - 1;
      const inputLetters = this.inputValue.split('');
      const selectedLetters = selectedWord.value?.split('');

      inputLetters.forEach((sL: string, index: number) => {
        if (sL !== selectedLetters[index]) {
          selectedWord.mistake = true;
        } else {
          selectedWord.mistake = false;
        }
      });
    }
  }

  public getWords(): void {
    this.http.get<any>(`${WordsAPI}?pocet=${this.maxWords}`).subscribe((data: string[]) => {
      data.forEach((i: string) => {
        this.words.push({ value: i, mistake: false });
      });
    });
    console.log(this.words);
  }
  protected restart(): void {}
}
