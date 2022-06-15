import {Component, OnInit} from '@angular/core';
import {biosEmailAPI} from '../../../api';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NapicuBiosWaitListControllerService} from "@Napicu/OpenAPI/api/napicuBiosWaitListController.service";
import {NapicuApiResponseStatus} from "@Napicu/Api/ResponseStatus";
import {RequestExceptionSchema} from "@Napicu/OpenAPI/model/requestExceptionSchema";
import {HttpStatusCode} from "@Napicu/Api/HttpCodes";
import {NapicuBiosWaitListModel} from "@Napicu/OpenAPI/model/napicuBiosWaitListModel";
import {NapicuBiosWaitListResponseModel} from "@Napicu/OpenAPI/model/napicuBiosWaitListResponseModel";



interface APIResponseEnum {
  invalidEmail: boolean,
  emailExist: boolean,
  tooManyRequests: boolean,
  ok: boolean,
}

@Component({
  selector: 'app-bios-wait-list',
  templateUrl: './bios-wait-list.component.html',
  styleUrls: ['./bios-wait-list.component.scss'],
})
export class BiosWaitListComponent implements OnInit {
  public declare EmailInput: string;
  public submittedClick: boolean = false;

  public apiStatement: APIResponseEnum = {
    invalidEmail: false,
    emailExist: false,
    tooManyRequests: false,
    ok: false
  };

  public napicuForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(public service: NapicuBiosWaitListControllerService) {
  }

  ngOnInit(): void {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public submit(): void {
    this.getApiData();
  }

  public onKeyDown = (event: KeyboardEvent): void =>  {
    if(event.keyCode == 13){
      this.submit();
    }
  }

  public async getApiData(): Promise<void>{
    if (this.email?.valid && this.email.value) {
      await this.service.post({email: this.email.value}).toPromise()
        .then((data: NapicuBiosWaitListResponseModel | undefined) => {
          this.apiStatement.ok = true;
        })
        .catch((error: HttpErrorResponse) => {
          let i = error.error as RequestExceptionSchema;
          if (i.code === HttpStatusCode.TOO_MANY_REQUESTS) {
            this.apiStatement.tooManyRequests = true;
          }
        })
      this.submittedClick = true; //TODO
    }
  }

  get email() {
    return this.napicuForm.get('email');
  }

}
