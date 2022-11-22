import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { merge, Observable, Observer, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ShowProductDatasource } from 'src/app/model/datasource/showproduct.datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from 'src/app/model/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AnyField, AnyPageFilter, SortFilter } from 'src/app/model/rest/filter';
import { ProductService } from 'src/app/services/product.service';

interface Tipo {
  value: number,
  viewValue: string
}

@Component({
  templateUrl: './get-producer.component.html',
  styleUrls: ['./get-producer.component.scss']
})


export class GetProducerComponent implements OnInit {
  user: User;
  userE: User;
  producerForm: FormGroup;
  errors: string[];
  unEditable: boolean = true;
  saveBttn: string = "display: none";
  editBttn: string = "display: inline-block";

  dataSource: ShowProductDatasource;
  displayedColumns = [
    'image',
    'select',
    'id',
    'name',
    'quantity',
    'typeProd',
    'price',
  ];
  fields = ['id', 'name', 'quantity', 'typeProd', 'price'];

  selection = new SelectionModel<Product>(true, []);
  error = false;

  highlightedRow: Product;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.user = new User();
    this.userE = new User();
  }

  ngOnInit(): void {
    this.producerFormGroup();
    this.user.login = this.route.snapshot.params['login'];
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'name'
    );
    if (this.user.login) {
      this.userService.getUser(this.user.login).subscribe(
        response => {
          this.user = response;
          this.producerForm.patchValue(this.user, { emitEvent: false, onlySelf: false });
        }
      );
    }
    this.dataSource = new ShowProductDatasource(this.productService);
    this.dataSource.getMyProducts(pageFilter, this.user.login);
  }

  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.selection.clear();
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadProductsPage();
        })
      )
      .subscribe();
  }

  onFormChanges() {
    this.producerForm.valueChanges.subscribe((val) => { });
  }

  producerFormGroup() {
    this.producerForm = this.fb.group({
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
    this.router.navigate(['/users/showProducers']);
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/users/getUser/producer/' + this.user.login]);
    } else {
      console.log(response);
    }
  }

  save() {
    const newUser: User = Object.assign({}, this.producerForm.value);
    let message;
    if ((newUser.email == null || newUser.email.length != 0)) {
      this.assignValues(newUser);
      let regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
      console.log(regex.test(newUser.email));
      if (!regex.test(newUser.email)) {
        message = this.translate.instant("EMAIL_INVALID");
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
          } else if (err.error.errors.toString().includes("users_nif_unique")) {
            message = this.translate.instant("USER_NIF_UNIQUE");
          } else if (err.error.errors.toString().includes("users_phone_unique")) {
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

  onCancel() {
    this.unEditable = true;
    this.saveBttn = "display: none";
    this.editBttn = "display: inline-block";
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.translate.instant('delete-product-confirmation'),
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
    const product = this.selection.selected[0];
    this.selection.deselect(product);
    this.productService.deleteProduct(product.id).subscribe(
      response => {
        Swal.fire(this.translate.instant("PRODUCT_DELETE_SUCCESS")).then(() => {
          this.router.navigate(['/users/getUser/producer/' + this.user.login]);
          window.location.reload();
        })
      },
      err => {
        Swal.fire(this.translate.instant("PRODUCT_REMOVE_ERROR"));
        this.errors = err.error.errors as string[];
        console.error(err.status);
        console.error(this.errors);
      }
    );
  }

  loadProductsPage() {
    this.selection.clear();
    this.error = false;
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    pageFilter.order = [];
    pageFilter.order.push(
      new SortFilter(this.sort.active, this.sort.direction.toString())
    );

    this.dataSource.getMyProducts(pageFilter, this.user.login);
  }


  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.productsSubject.value.forEach(row => this.selection.select(row));
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.productsSubject.value.length;
    return numSelected === numRows;
  }

  onEdit(row: Product) {
    this.highlightedRow = row;
    this.router.navigate(['/products/edit/' + row.id]);
  }

  onAdd() {
    this.router.navigate(['/products/createProductByAdmin/' + this.user.login]);

  }
}



