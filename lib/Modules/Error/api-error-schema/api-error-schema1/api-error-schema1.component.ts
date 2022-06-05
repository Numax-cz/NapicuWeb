import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-api-error-schema1',
  templateUrl: './api-error-schema1.component.html',
  styleUrls: ['./api-error-schema1.component.scss']
})
export class ApiErrorSchema1Component implements OnInit {

  @Input() public declare apiRetry: () => void;
  @Input() public declare trying: boolean;

  constructor() { }

  ngOnInit(): void {
  }



  get getTrying(): boolean{
    return this.trying;
  }

}
