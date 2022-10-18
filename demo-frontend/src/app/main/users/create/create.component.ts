import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profiles } from 'src/app/model/profile';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';



interface Tipo {
  value: number,
  viewValue: string
}

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user : User;
  userForm: FormGroup;
  selected: number = 1;
  nome :string="nombre";
  description: string ="shshshs";

    

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
      this.user.profile = new Profiles();
    }

  ngOnInit(): void {
    this.user.profile.id = this.selected;
    this.user.profile.name = this.nome;
    this.user.profile.description = this.description;
    this.createFormGroup();
  }



  createFormGroup(){
    this.userForm = this.fb.group({      
      email: [this.user.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      login: [this.user.login],
      password:[this.user.password],
      profile:[ this.user.profile]
      /*profile:[ {id: this.selected, name: this.nome, description:this.description}]*/
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
