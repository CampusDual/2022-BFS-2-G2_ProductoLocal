import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Profile } from 'src/app/model/profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { ConfirmPasswordValidator } from 'src/app/model/rest/confirm-password.validator';


@Component({
  templateUrl: './create-producer.component.html',
  styleUrls: ['./create-producer.component.scss']
})
export class CreateProducerComponent implements OnInit {
  producerFormAdmin: FormGroup;
  user: User;
  profile : Profile;

  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private userService: UserService,
    ) { 
      this.user = new User();
      this.profile = new Profile();
    }

  ngOnInit(): void {
    this.createFormGroup();
  }



  createFormGroup() {
    this.producerFormAdmin = this.fb.group({
      login: [this.user.login],
      email:[this.user.email],
      password:[this.user.password],
      confirmPassword:[this.user.password],
      nif: [this.user.nif, Validators.pattern("[0-9]{8}[A-Za-z]{1}")],
      name: [this.user.name],
      surname: [this.user.surname],
      phone:[this.user.phone],
      address: [this.user.address],
      city: [this.user.city],
      zip: [this.user.zip],
    },
    {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    }
    );
  }

  cancel() {
    this.router.navigate(['/users/showProducers']);
  }

  save() {
    const newUser: User = Object.assign({}, this.producerFormAdmin.value);
    console.log(newUser);
    this.profile.id = 2;
    newUser.profiles = [this.profile];
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
      this.router.navigate(['/users/showProducers']);
    } else {
      console.log(response);
    }
  }

}
