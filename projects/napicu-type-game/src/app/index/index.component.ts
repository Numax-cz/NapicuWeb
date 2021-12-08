import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordsAPI } from 'api';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public readonly maxWords: number = 300;

  public selectedWord: number = 0;

  public declare inputValue: string | null;

  public words: string[] = [];

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

  public onSpaceBar(e: KeyboardEvent): void {
    if (this.inputValue?.indexOf(' ') != 0) {
      this.inputValue = null;
      this.selectedWord += 1;
      e.preventDefault();
    }
  }
  public onInputChange(e: any): void {
    console.log(this.inputValue);
  }

  public getWords(): void {
    this.http.get<any>(`${WordsAPI}?pocet=${this.maxWords}`).subscribe((data: string[]) => {
      this.words = data;
    });
  }
  protected restart(): void {}
}
