import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  selectedCSVFileName : string = "";
  isCSV_Valid : boolean = false;
  csvData : any = [];
  isCsvUploaded : boolean = false;
  errorString : string = "";
  justUploaded : boolean = false;
  billTotal : number = 0;
  


  constructor(public loginService : LoginService, public papa : Papa, public inventoryService : InventoryService) { }

  filterData(data : any) : any{
    let totalAmt = 0;
    data.forEach((element : any, index : any) => {
      if(element[0] < 0 || element[0] >= this.inventoryService.getInventory().length || element[4] <= 0 || element[4] > 5 ){
        data.splice(index,1);
      }
      else totalAmt += Number(element[8])*Number(element[3]);
    });
    this.billTotal = totalAmt;
    return data;

  }

  hideAlert() : void {
    window.setTimeout(()=>{
        this.justUploaded = false;
    }, 2500);
  }

  createRange(number : number){
    return new Array(number);
  }

  getTotalPrice(quantity : number, price : number) : number{
    return quantity*price; 
  }

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;

    if (files !== null && files !== undefined && files.length > 0) {

      this.selectedCSVFileName = files[0].name;

      const reader: FileReader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = e => {

        const csv = reader.result;
        const results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.isCSV_Valid = true;
          this.errorString = "";

          this.justUploaded = true;
          this.hideAlert();

          // PERFORM OPERATIONS ON PARSED CSV
          let csvTableHeader = results.data[0];
          let csvTableData = [...results.data.slice(1, results.data.length)];
          this.isCsvUploaded = true;
          this.csvData = this.filterData(csvTableData);


        } else {
          this.errorString = "";
          this.csvData = [];
          this.errorString += "Error Parsing CSV File: ";
          for (let i = 0; i < results.errors.length; i++) {
            this.errorString += results.errors[i].message + ' ';
          }
        }
      };
    } else {
      console.log('No File Selected');
    }

  }
  ngOnInit(): void {
  }

}
