import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { AnyField, AnyPageFilter } from 'src/app/model/rest/filter';

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
  suggestions: Product[];
  sgt: boolean;

  constructor(
    private productService: ProductService,
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
    this.idProduct = this.route.snapshot.params['id'];
    if (this.idProduct) {
      const pageFilter = new AnyPageFilter(
        "",
        ['id', 'name', 'price'].map((field) => new AnyField(field)),
        0,
        100,
        'price'
      );
      this.productService.getProduct(this.idProduct).subscribe(
        response => {
          this.product = response;
          this.producer = this.product.user;
          this.productService.getMyProducts(pageFilter, this.producer.login).subscribe((a) => {
            this.suggestions = a.data;
            for (const p of this.suggestions) {
              if (p.id == this.idProduct) {
                this.suggestions.splice(this.suggestions.indexOf(p), 1);
              }
            }
            this.sgt = (this.suggestions.length > 0);
          });
        });
    }

  }
  goBack() {
    this.router.navigate(['/products/products']);
  }

  contact(email: string, productName: string, productId: number) {
    location.href = "mailto:" + email + "?Subject=Reserva " + productName + "&body=Hola!%0AMe%20gustaría%20reservar%20este%20producto:%0A-%20#REF: " + productId + "%0A-%20Producto: " + productName + "%0A-%20Cantidad: 1";
  }

  showDetails(id: number) {
    this.router.navigate(['/products/getProductDetail/' + id]).then(() =>
      window.location.reload());
  }
}
