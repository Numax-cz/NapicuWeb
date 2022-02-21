import { Component, OnInit } from '@angular/core';
import {biosEmailAPI} from "../../../api";
import {HttpClient} from "@angular/common/http";
import {BiosWaitListPOSTApiModel} from "../../../Server/src/interface/Model";
import {BiosWaitListPOSTApiResponse} from "../../../Server/src/interface/Responses";
import {HttpResponse} from '../../../Server/src/util/HttpResponse'

@Component({
  selector: 'app-bios-wait-list',
  templateUrl: './bios-wait-list.component.html',
  styleUrls: ['./bios-wait-list.component.scss']
})
export class BiosWaitListComponent implements OnInit {
  public declare EmailInput: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }


  public inputChange(): void {
  }

  public buttonClick(): void {
    const body: BiosWaitListPOSTApiModel = {email: this.EmailInput};
    this.http.post<HttpResponse<BiosWaitListPOSTApiResponse>>(biosEmailAPI, body).subscribe((data: HttpResponse<BiosWaitListPOSTApiResponse>)=> {
      console.log(data)
      if(data.data.emailAlreadyExists){

    }
   });

  }

}
