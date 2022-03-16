import { Component, OnInit } from '@angular/core';
import {ApiservicesService} from '../apiservices.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiservicesService) { }

  readData : any;
  successMsg : any;

  ngOnInit(): void {
    this.getAllData();
  }

  deleteId(id:any) {
    this.service.deletedata(id).subscribe((result) => {
      console.log(result,'delete=');
      this.successMsg = result.message;
      this.getAllData();
      });
    
  }

  getAllData() {
    this.service.getAllData().subscribe((result) => {
      console.log(result,'result=');
      this.readData = result.data;
    })
  }

}
