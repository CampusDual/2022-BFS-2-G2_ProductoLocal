import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';


interface Tipo {
  value: string,
}

@Component({
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})

export class CreateProductComponent implements OnInit {

  product: Product;
  productForm: FormGroup;
  userOwnerLogin:string;
  userOwner:User;

  categories: Tipo[] = [
    { value: 'unidades'},
    { value: 'kilos'},
    { value: 'gramos'},
    { value: 'litros'}
  ];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private userService: UserService,
    ) {
    this.product = new Product();
    this.userOwnerLogin = this.authService.getUserName();
    this.userService.getUser(this.userOwnerLogin).subscribe(
      response => {
        this.userOwner = response;
      }
/*
      ,
      (err) => {
        this.errors = err.error as string[];
        console.error(err.status);
        console.error(this.errors);
      }
      );
*/
    )
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.productForm = this.fb.group({
      name: [this.product.name],
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
    const newProduct: Product = Object.assign({}, this.productForm.value);
    newProduct.user = this.userOwner;
    console.log(newProduct);
    let message;
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
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/main']);
    } else {
      console.log(response);
    }
  }

}
