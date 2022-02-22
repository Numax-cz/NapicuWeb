import { Component, OnInit } from '@angular/core';
import { biosEmailAPI } from '../../../api';
import { HttpClient } from '@angular/common/http';
import { BiosWaitListPOSTApiModel } from '../../../Server/src/interface/Model';
import { BiosWaitListPOSTApiResponse } from '../../../Server/src/interface/Responses';
import { HttpResponse } from '../../../Server/src/util/HttpResponse';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpStatusCode } from '../../../Server/src/interface/HttpStatusCode';


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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public submit(): void {
    if (this.email?.valid) {
      const body: BiosWaitListPOSTApiModel = { email: this.EmailInput };
      this.http.post<HttpResponse<BiosWaitListPOSTApiResponse>>(biosEmailAPI, body).subscribe((data: HttpResponse<BiosWaitListPOSTApiResponse>) => {
        console.log(data);
          if (data.data.emailAlreadyExists) {
            this.apiStatement.emailExist = true;
          } else {
          }
          this.apiStatement.ok = true;
        }, (error: HttpResponse<BiosWaitListPOSTApiResponse>) => {
        if(error.status === HttpStatusCode.tooManyRequests){
         this.apiStatement.tooManyRequests = true;
        }
      });
    }
    this.submittedClick = true;
  }

  get email() {
    return this.napicuForm.get('email');
  }


}
