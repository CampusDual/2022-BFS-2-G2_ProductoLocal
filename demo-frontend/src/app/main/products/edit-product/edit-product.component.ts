import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/model/user';

interface Tipo {
  value: string,
}

@Component({
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})

export class EditProductComponent implements OnInit{
  idProduct: number;

  productForm: FormGroup;
  product: Product;
  errores: string[];

  categories: Tipo[] = [
    { value: 'unidades' },
    { value: 'kilos' },
    { value: 'gramos' },
    { value: 'litros' }
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.product = new Product();
    this.product.user = new User();
  }
  value: string;

  ngOnInit() {
    this.createFormGroup();
    this.idProduct = this.route.snapshot.params['id'];

    if (this.idProduct) {
      this.productService.getProduct(this.idProduct).subscribe(
        response => {
          this.product = response;
          this.productForm.patchValue(this.product, { emitEvent: false, onlySelf: false });
          this.logger.info(this.product);
        }
      );
    }
  }



  onFormChanges() {
    this.productForm.valueChanges.subscribe((val) => { });
  }

  createFormGroup() {
    this.productForm = this.fb.group({
      ownername: [this.product.user.login],
      name: [this.product.name],
      typeProd: [this.product.typeProd],
      quantity: [this.product.quantity],
      description: [this.product.description],
      price: [this.product.price],
    });
  }

  save() {
    const newProduct: Product = Object.assign({}, this.productForm.value);
    newProduct.id = this.idProduct;
    console.log(newProduct);
    if (newProduct.id) {
      this.productService.editProduct(newProduct).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['products/showProducts']);
    } else {
      console.log(response);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return false;
    }
  }

  cancel() {
    this.router.navigate(['products/showProducts']);
  }
}
