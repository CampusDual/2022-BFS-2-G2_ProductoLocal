import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { ConfirmPasswordValidator } from 'src/app/model/rest/confirm-password.validator';


interface Tipo {
  value: number,
  viewValue: string,
}

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user: User;
  userForm: FormGroup;

  categories: Tipo[] = [
    { value: 2, viewValue: 'Productor' },
    { value: 3, viewValue: 'Cliente' },
  ];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.createFormGroup();
  }


  createFormGroup() {
    this.userForm = this.fb.group({
      email: [this.user.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      login: [this.user.login],
      city: [this.user.city],
      password:[this.user.password],
      profiles: [this.user.profiles],
      confirmPassword:[this.user.password]
    },
    {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    }
    );
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  save() {
    const newUser: User = Object.assign({}, this.userForm.value);
    let message;
    this.userService.createUser(newUser).subscribe((response) => {
      console.log(this);
      message = this.translate.instant("USER_CREATE_SUCCESS")
      swal.fire(message, "", 'success').then((res) => this.redirectList(response));
      
    }, err => {
      console.log(err.message);
      if (err.error.errors.toString().includes("users_login_unique")) {
        message = this.translate.instant("USER_LOGIN_UNIQUE");
      } else if (err.error.errors.toString().includes("users_email_unique")) {
        message = this.translate.instant("USER_EMAIL_UNIQUE");
      }
      swal.fire({
        confirmButtonColor: '#bfedff',
        title: this.translate.instant('ERROR'),
        text: this.translate.instant(message),
        icon: 'error'
      });
    }
    );
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/login']);
    } else {
      console.log(response);
    }
  }
}
