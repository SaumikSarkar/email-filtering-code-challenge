import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {

  //******** Variables ***********/

  emailID: string;
  emailValidation: string = null;

  @Output('email-value') emailValue: EventEmitter<string> = new EventEmitter<string>();

  //**************************** */

  constructor() { }

  ngOnInit() { }

  addEmail(event: MouseEvent) {
    this.emailValue.emit(this.emailID);
    this.emailID = null;
  }

  checkEmailValidation() {
    let emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(this.emailID)) {
        this.emailValidation = null;
    }
    else {
        this.emailValidation = '*Input should be in email format';
    }
  }

}
