import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';


interface Tipo {
  value: string,
}

@Component({
  templateUrl: './create-product-by-admin.component.html',
  styleUrls: ['./create-product-by-admin.component.scss']
})

export class CreateProductByAdminComponent implements OnInit {

  product: Product;
  productFormAdmin: FormGroup;
  userOwnerLogin:string;
  userOwner: User;


  categories: Tipo[] = [
    { value: 'unidades'},
    { value: 'kilos'},
    { value: 'gramos'},
    { value: 'litros'}
  ];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private userService: UserService,
    ) {
    this.product = new Product();
    this.userOwner = new User();
    this.product.user = new User();
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.productFormAdmin = this.fb.group({
      ownername: [this.product.user.login],
      name: [this.product.name],
      typeProd: [this.product.typeProd],
      quantity: [this.product.quantity],
      description:[this.product.description],
      price: [this.product.price],
    },
    );
  }

  cancel() {
    this.router.navigate(['/main']);
  }


  save() {
    const newProduct: Product = Object.assign({}, this.productFormAdmin.value);
    let message;
    this.userService.getUser(this.productFormAdmin.value.ownername).subscribe(
      response => {
        this.userOwner = response;
        newProduct.user = this.userOwner;
        console.log(newProduct);
        this.productService.createProduct(newProduct).subscribe((response) => {
          console.log(this);
          message = this.translate.instant("PRODUCT_CREATE_SUCCESS")
          swal.fire(message, "", 'success').then((res) => this.redirectList(response));
          
        }, err => {
          console.log(err.message);
          swal.fire({
            confirmButtonColor: '#bfedff',
            title: this.translate.instant('ERROR'),
            text: this.translate.instant(message),
            icon: 'error'
          });
        }
        );
      },
      (err) => {
        console.log(err.message);
        message = this.translate.instant("USER_NOT_EXISTS");
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
      this.router.navigate(['/main']);
    } else {
      console.log(response);
    }
  }

}