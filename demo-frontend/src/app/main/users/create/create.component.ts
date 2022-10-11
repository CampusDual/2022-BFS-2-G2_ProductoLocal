import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  /*selector: 'app-create',*/
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user : User;
  userForm: FormGroup;

  constructor(    
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.createFormGroup();
 }

  createFormGroup(){
    this.userForm = this.fb.group({      
      email: [this.user.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      login: [this.user.login],
      password:[this.user.password],
    });
  }

}
