import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Observable, Observer } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/user';

@Component({
  //selector: 'app-get-product-details',
  templateUrl: './get-product-details.component.html',
  styleUrls: ['./get-product-details.component.scss']
})
export class GetProductDetailsComponent implements OnInit {
  idProduct: number;
  product: Product;
  productForm: FormGroup;
  producer: User;

  constructor(
    private productService:ProductService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) { 
    this.product = new Product();
    this.producer = new User();
  }

  ngOnInit(): void {
    this.productFormGroup();
    this.idProduct = this.route.snapshot.params['id'];

    if (this.idProduct) {
      this.productService.getProduct(this.idProduct).subscribe(
        response => {
          this.product = response;
          this.producer = this.product.user;
          this.productForm.patchValue(this.product, { emitEvent: false, onlySelf: false });
          this.logger.info(this.product);
        }
      );
    }
    
  }

  productFormGroup() {
    this.productForm = this.fb.group({
      name: [this.product.name],
      quantity: [this.product.quantity],
      description: [this.product.description],
      typeProd: [this.product.typeProd],
      price: [this.product.price],

      producer: [this.producer.login],     
      city: [this.producer.city],
      zip: [this.producer.zip],
      email: [this.producer.email],
      phone: [ this.producer.phone],
    });
  }


  goBack() {
    this.router.navigate(['/products/products']);
  }

}
