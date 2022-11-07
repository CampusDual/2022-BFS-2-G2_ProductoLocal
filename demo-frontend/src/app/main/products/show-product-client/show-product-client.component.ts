import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ShowProductDatasource } from 'src/app/model/datasource/showproduct.datasource';
import { AnyField, AnyPageFilter } from 'src/app/model/rest/filter';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-product-client',
  templateUrl: './show-product-client.component.html',
  styleUrls: ['./show-product-client.component.scss']
})
export class ShowProductClientComponent implements OnInit {

  dataSource: ShowProductDatasource;
  fields = ['name', 'quantity', 'typeProd', 'price', 'user.login'];
  products;

  constructor(
    private productService: ProductService,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataSource = new ShowProductDatasource(this.productService);
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      16,
      'name'
    );
    this.dataSource.getProducts(pageFilter);
    this.productService.getProducts(pageFilter).subscribe((a) => {
      this.products = a.data;
    });
  }

  contact(email: string, productName: string) {
    location.href = "mailto:" + email + "?Subject=Reserva " + productName + "&body=Hola!%0AMe%20gustaría%20reservar%20este%20producto:%0A-%20Producto: " + productName + "%0A-%20Cantidad: 1";
  }
}
