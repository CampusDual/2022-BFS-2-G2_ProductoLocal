import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Observable } from 'rxjs/internal/Observable';


interface Tipo {
  value: string,
  viewValue:String
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

  tipos: Tipo[] = [
    { value: 'bebida', viewValue: 'Drinks' },
    { value: 'fruta', viewValue: 'Fruits' },
    { value: 'hortaliza', viewValue: 'Vegetables' },
    { value: 'legumbre', viewValue: 'Legumes' },
    { value: 'lacteo', viewValue: 'Dairy' },
    { value: 'otro', viewValue: 'Others' },
    { value: 'todas', viewValue: 'All' },
  ];

  /* Carga de imagenes*/
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  image: string;
  
  previews: string[] = [];
  /*  fin carga imagenes*/ 

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;

  categories: Tipo[] = [
    { value: 'Units', viewValue: 'Units'},
    { value: 'Kilograms', viewValue: 'Kilograms'},
    { value: 'Grams', viewValue: 'Grams'},
    { value: 'Liters', viewValue: 'Liters'}
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
      typeProd: [this.product.typeProd],
      quantity: [this.product.quantity],
      description:[this.product.description],
      price: [this.product.price],
    },
    );
  }

  cancel() {
    this.router.navigate(['/products/myProducts']);
  }


  save() {
    const newProduct: Product = Object.assign({}, this.productForm.value);
    newProduct.user = this.userOwner;
    newProduct.imageUrl = "";
    newProduct.image = this.image;
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
      this.router.navigate(['/products/myProducts']);
    } else {
      console.log(response);
    }
  }

  selectFiles(event) : void {
    
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

   this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.image = e.target.result;
          this.image = this.image.slice(this.image.indexOf(",") + 1);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);     
        this.selectedFileNames.push(this.selectedFiles[i].name);

        
      }
    } 
  }
}
