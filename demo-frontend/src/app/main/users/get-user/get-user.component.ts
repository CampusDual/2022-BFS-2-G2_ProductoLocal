import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Tipo {
  value: number,
  viewValue: string
}

@Component({
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss']
})
export class GetUserComponent implements OnInit {

  user : User;
  userForm: FormGroup;

  constructor(    
    private userService : UserService,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.user = new User();
    }

  ngOnInit(): void {
    this.getUserFormGroup();
  }

  getUserFormGroup(){
    this.userForm = this.fb.group({      
      email: [this.user.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      login: [this.user.login],
      password:[this.user.password],
    });
  }
  
  cancel() {
    this.router.navigate(['/login']);
  }

  save() {
    const newUser: User = Object.assign({}, this.userForm.value);
    this.userService.createUser(newUser).subscribe((response) => {
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
