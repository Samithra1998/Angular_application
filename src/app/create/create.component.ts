import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiservicesService} from '../apiservices.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiservicesService,private router:ActivatedRoute) { }

  errMsg : any;
  successMsg : any;
  getParmId : any;

  ngOnInit(): void {
    this.getParmId = this.router.snapshot.paramMap.get('id');
    this.service.getSingleData(this.getParmId).subscribe((result) => {
        console.log(result,"result =");
        this.userForm.patchValue({
          eId : result.data[0].eId,
          fName : result.data[0].fName,
          lName : result.data[0].lName,
          address : result.data[0].address,
          noOfHours : result.data[0].noOfHours,
          date : result.data[0].date,
          amount : result.data[0].amount,
          signature : result.data[0].signature,
          bCode : result.data[0].bCode,
          dName : result.data[0].dName,
          phone : result.data[0].phone
        });
    });
  }

  userForm = new FormGroup({
    'eId': new FormControl('',Validators.required),
    'fName': new FormControl('',Validators.required),
    'lName': new FormControl('',Validators.required),
    'address': new FormControl('',Validators.required),
    'noOfHours': new FormControl('',Validators.required),
    'date': new FormControl('',Validators.required),
    'amount': new FormControl('',Validators.required),
    'signature': new FormControl('',Validators.required),
    'bCode': new FormControl('',Validators.required),
    'dName': new FormControl('',Validators.required),
    'phone': new FormControl('',Validators.required),
  });

  //create data
  userSubmit() {

    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.service.insertData(this.userForm.value).subscribe((result) => {
        console.log(result,'res=');
        this.userForm.reset();
        this.successMsg = result.message;
      })
    }
    else {
      this.errMsg = 'All Fields required!'
      
    }

  }

  //update data
  userUpdate() {
    
    if(this.userForm.valid) {
        this.service.updateData(this.userForm.value,this.getParmId).subscribe((result) => {
          console.log(result,"data updated");
          this.successMsg = result.message;
          console.log(this.userForm.value);
        });
    }
    else {
      this.errMsg = 'All fields required!'
    }
  }

}
