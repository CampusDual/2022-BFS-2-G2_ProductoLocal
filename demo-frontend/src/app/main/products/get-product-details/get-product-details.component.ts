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
      name: [{value:this.product.name, disabled:true}],
      quantity: [{value:this.product.quantity, disabled:true}],
      description: [{value:this.product.description, disabled:true}],
      typeProd: [{value:this.product.typeProd, disabled:true}],
      price: [{value:this.product.price, disabled:true}],

      producer: [{value:this.producer.login, disabled:true}],     
      city: [{value:this.producer.city, disabled:true}],
      zip: [{value:this.producer.zip, disabled:true}],
      email: [{value:this.producer.email, disabled:true}],
      phone: [ {value:this.producer.phone, disabled:true}],
    });
  }


  goBack() {
    this.router.navigate(['/products/products']);
  }

}
