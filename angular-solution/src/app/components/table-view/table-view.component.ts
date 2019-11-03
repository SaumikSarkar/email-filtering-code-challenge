import { Component, OnInit } from '@angular/core';

interface ITableData {
  value: string;
  enabled: boolean;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  //************ Variables ************/

  isEnabled: boolean;
  searchString: string;
  emailIDs: Array<ITableData> = [];
  displayEmails: Array<ITableData> = [];

  //********************************* */

  constructor() { }

  ngOnInit() { }

  addEmail(value: string) {
    let newEmail: ITableData = {
      value: value,
      enabled: false
    }
    this.emailIDs.push(newEmail);
    this.clearControls();
    this.displayEmails = this.emailIDs.slice(0);
  }

  searchLogic() {
    this.displayEmails = this.emailIDs.filter((data: ITableData) => {
      if (this.isEnabled) {
        if ((data.value.includes(this.searchString) && data.enabled && this.searchString) ||
          (!this.searchString && data.enabled)) {
          return true;
        }
      }
      else {
        if ((data.value.includes(this.searchString) && this.searchString) || !this.searchString) {
          return true;
        }
      }
      return false;
    });
  }

  deleteRow(value: string) {
    this.emailIDs.forEach((data, index) => {
      if (data.value == value) {
        this.emailIDs.splice(index, 1);
      }
    });
    this.displayEmails.forEach((data, index) => {
      if (data.value == value) {
        this.displayEmails.splice(index, 1);
      }
    });  
  }

  clearControls() {
    this.isEnabled = false;
    this.searchString = null;
  }

}