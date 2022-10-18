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
  login: string;
  userForm: FormGroup;
  errors: string[];


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
  }

  ngOnInit(): void {
    this.userFormGroup();
    this.userService.getUser(this.login).subscribe(
      response => {
        this.user = response;
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error(err.status);
        console.error(this.errors);
      }
    );
  }

  userFormGroup() {
    this.userForm = this.fb.group({
      email: [this.user.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      login: [this.user.login],
      nif: [this.user.nif],
      password: [this.user.password],
      city: [this.user.city],
      name: [this.user.name],
      surname: [this.user.surname],
      address: [this.user.address],
      phone: [this.user.phone],
      zip: [this.user.zip]
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/login']);
    } else {
      console.log(response);
    }
  }

  update(){

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
        this.user = response;
        this.authService.logout();
        this.router.navigate(['']);
        localStorage.setItem('close_session', '1');
        localStorage.setItem('close_session_language', this.translate.currentLang);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error(err.status);
        console.error(this.errors);
      }
    );

    
  }
}
