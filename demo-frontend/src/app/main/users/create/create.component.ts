import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';



interface Tipo {
  value: number,
  viewValue: string,
}

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user : User;
  userForm: FormGroup;

  categories: Tipo[] = [
    {value: 2, viewValue: 'Productor'},
    {value: 3, viewValue: 'Cliente'},
  ];

  constructor(    
    private userService : UserService,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.user = new User();
    }

  ngOnInit(): void {
    this.createFormGroup();
  }



  createFormGroup(){
    this.userForm = this.fb.group({      
      email: [this.user.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      login: [this.user.login],
      password:[this.user.password],
      profiles: [this.user.profiles]
    });
  }
  
  cancel() {
    this.router.navigate(['/login']);
  }

  save() {
    const newUser: User = Object.assign({}, this.userForm.value);
    this.userService.createUser(newUser).subscribe((response) => {
      console.log(this);
      this.redirectList(response);
    });
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/login']);
    }else{
      console.log(response);
    }
  }
}
