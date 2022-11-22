import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, startWith } from 'rxjs';


interface Tipo {
  value: string,
  viewValue: String
}

@Component({
  templateUrl: './create-product-by-admin.component.html',
  styleUrls: ['./create-product-by-admin.component.scss']
})

export class CreateProductByAdminComponent implements OnInit {

  product: Product;
  productFormAdmin: FormGroup;
  userOwnerLogin: string;
  userOwner: User;
  imgURL: any = '';
  producers: User[] = [];
  producerControl = new FormControl('');
  filteredProducers: Observable<User[]>;
  userLogin: string;

  /* Carga de imagenes*/
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  image: string;

  previews: string[] = [];
  /*  fin carga imagenes*/

  tipos: Tipo[] = [
    { value: 'Drinks', viewValue: 'Drinks' },
    { value: 'Fruits', viewValue: 'Fruits' },
    { value: 'Vegetables', viewValue: 'Vegetables' },
    { value: 'Legumes', viewValue: 'Legumes' },
    { value: 'Dairy', viewValue: 'Dairy' },
    { value: 'Others', viewValue: 'Others' },

  ];
  categories: Tipo[] = [
    { value: 'Units', viewValue: 'Units' },
    { value: 'Kilograms', viewValue: 'Kilograms' },
    { value: 'Grams', viewValue: 'Grams' },
    { value: 'Liters', viewValue: 'Liters' }
  ];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private userService: UserService,
    private route: ActivatedRoute,

  ) {
    this.product = new Product();
    this.userOwner = new User();
    this.product.user = new User();
  }

  ngOnInit(): void {
    this.userLogin = this.route.snapshot.params['login'];
    if (!this.userLogin) {
      this.userService.getProducers().subscribe((response) => {
        response.forEach(a => this.producers.push(a));
        this.producers.sort((a, b) => a.login.localeCompare(b.login));
      }, (err) => {
        swal.fire({
          confirmButtonColor: '#bfedff',
          title: this.translate.instant('ERROR'),
          text: this.translate.instant("GET_PRODUCERS_ERROR"),
          icon: 'error'
        });
      }
      );
    }
    this.createFormGroup();
  }

  ngAfterViewInit(): void {
    this.filteredProducers = this.producerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  createFormGroup() {
    this.productFormAdmin = this.fb.group({
      ownername: this.producerControl,
      name: [this.product.name],
      typeProd: [this.product.typeProd],
      quantity: [this.product.quantity],
      description: [this.product.description],
      price: [this.product.price],
    },
    );
  }

  cancel() {
    history.back();
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.producers.filter(user => user.login.toLowerCase().includes(filterValue));
  }

  save() {
    const newProduct: Product = Object.assign({}, this.productFormAdmin.value);
    let message;
    if(!this.userLogin) {
      this.userLogin = this.productFormAdmin.value.ownername;
    }
    console.log(this.userLogin);
    this.userService.getUser(this.userLogin).subscribe(
      response => {
        this.userOwner = response;
        newProduct.user = this.userOwner;
        newProduct.imageUrl = "";
        newProduct.image = this.image;
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
    history.back();
  }

  selectFiles(event): void {

    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.image = e.target.result;
          this.image = this.image.slice(this.image.indexOf(',') + 1);
          this.previews.push(e.target.result);
          this.imgURL = e.srcElement.result;
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

}
