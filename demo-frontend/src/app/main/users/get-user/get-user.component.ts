import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Observable, Observer } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';


interface Tipo {
  value: number,
  viewValue: string
}

@Component({
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss']
})
export class GetUserComponent implements OnInit {

  user: User;
  userE: User;
  login: string;
  userForm: FormGroup;
  errors: string[];
  unEditable: boolean = true;
  saveBttn: string = "display: none";
  editBttn: string = "display: inline-block";

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {
    this.login = this.authService.getUserName();
    this.user = new User();
    this.userE = new User();
  }

  ngOnInit(): void {
    this.userFormGroup();
    this.userService.getUser(this.login).subscribe(
      response => {
        this.user = response;
      },
      (err) => {
        this.errors = err.error as string[];
        console.error(err.status);
        console.error(this.errors);
      }
    );
  }

  userFormGroup() {
    this.userForm = this.fb.group({
      email: [this.userE.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      login: [this.userE.login],
      nif: [this.userE.nif, Validators.pattern("[0-9]{8}[A-Za-z]{1}")],
      city: [this.userE.city],
      name: [this.userE.name],
      surname: [this.userE.surname],
      address: [this.userE.address],
      phone: [this.userE.phone],
      zip: [this.userE.zip]
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/users/getUser']);
    } else {
      console.log(response);
    }
  }

  save() {
    const newUser: User = Object.assign({}, this.userForm.value);
    let message;
    if ((newUser.email == null || newUser.email.length != 0)) {
      this.assignValues(newUser);
      let regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
      console.log(regex.test(newUser.email));
      if (!regex.test(newUser.email)) {
        message =this.translate.instant("EMAIL_INVALID");
        Swal.fire("ERROR", message, 'error').then((r) => window.location.reload());;
      } else {
        this.userService.editUser(newUser).subscribe((response) => {
          message = this.translate.instant(response.responseMessage);

          Swal.fire(message, "", 'success');
          this.redirectList(response);
          console.log(response);
        }, (err) => {
          if (err.error.errors.toString().includes("users_email_unique")) {
            message = this.translate.instant("USER_EMAIL_UNIQUE");
          }else if (err.error.errors.toString().includes("users_nif_unique")){
            message = this.translate.instant("USER_NIF_UNIQUE");
          }else if (err.error.errors.toString().includes("users_phone_unique")){
            message = this.translate.instant("USER_PHONE_UNIQUE");
          }
          Swal.fire({
            confirmButtonColor: '#bfedff',
            title: this.translate.instant('ERROR'),
            text: this.translate.instant(message),
            icon: 'error'
          }).then((r) => window.location.reload());
        });
      }
    } else {
      message = "EMAIL_REQUIRED";
      Swal.fire({
        confirmButtonColor: '#bfedff',
        title: this.translate.instant('ERROR'),
        text: this.translate.instant(message),
        icon: 'error'
      }).then((r) => window.location.reload());
    }
    this.onCancel();
  }

  assignValues(userE: User) {
    userE.id = this.user.id;
    userE.login = this.user.login;
    if (userE.email == null) {
      userE.email = this.user.email;
    }
    if (userE.phone == null) {
      userE.phone = this.user.phone;
    }
    if (userE.zip == null) {
      userE.zip = this.user.zip;
    }
    if (userE.name == null) {
      userE.name = this.user.name;
    }
    if (userE.surname == null) {
      userE.surname = this.user.surname;
    }
    if (userE.address == null) {
      userE.address = this.user.address;
    }
    if (userE.city == null) {
      userE.city = this.user.city;
    }
    if (userE.nif == null) {
      userE.nif = this.user.nif;
    }
  }

  onEditable() {
    this.unEditable = false;
    this.saveBttn = "display: inline-block";
    this.editBttn = "display: none";
  }

  onCancel() {
    this.unEditable = true;
    this.saveBttn = "display: none";
    this.editBttn = "display: inline-block";
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.translate.instant('delete-element-confirmation'),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete();
        return new Observable((observer: Observer<boolean>) =>
          observer.next(true)
        );
      } else {
        return new Observable((observer: Observer<boolean>) =>
          observer.next(false)
        );
      }
    });
  }

  delete() {
    this.userService.deleteUser(this.login).subscribe(
      response => {
        Swal.fire(this.translate.instant("USER_REMOVE_SUCCESS")).then(() => {
          this.user = response;
          this.authService.logout();
          this.router.navigate(['/login']);
          localStorage.setItem('close_session', '1');
          localStorage.setItem('close_session_language', this.translate.currentLang);
        })
      },
      err => {
        Swal.fire(this.translate.instant("USER_REMOVE_ERROR"));
        this.errors = err.error.errors as string[];
        console.error(err.status);
        console.error(this.errors);
      }
    );
  }
}
