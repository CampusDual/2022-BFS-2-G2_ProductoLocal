import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent } from 'rxjs';
import { ShowProductDatasource } from 'src/app/model/datasource/showproduct.datasource';
import { Product } from 'src/app/model/product';
import { AnyField, AnyPageFilter, SortFilter } from 'src/app/model/rest/filter';
import { ProductService } from 'src/app/services/product.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, merge, Observable, Observer, tap } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import swal from 'sweetalert2';

@Component({
  //selector: 'app-show-product-client',
  templateUrl: './show-product-client.component.html',
  styleUrls: ['./show-product-client.component.scss']
})
export class ShowProductClientComponent implements OnInit {

  dataSource: ShowProductDatasource;
  fields = ['name', 'quantity', 'typeProd', 'price', 'user.login', 'user.city'];
  products: Product[];
  selection = new SelectionModel<Product>(true, []);
  error = false;


  @ViewChild('input') input: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
      10,
      'name'
    );
    this.dataSource.getProducts(pageFilter);
    this.productService.getProducts(pageFilter).subscribe((a) => {
      this.products = a.data;
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductsCities();
        })
      )
      .subscribe();
    this.paginator.page.pipe(
        tap(() => {
          this.loadProductsPage();
        })
      )
      .subscribe()
  }

  contact(email: string, productName: string) {
    location.href = "mailto:" + email + "?Subject=Reserva " + productName + "&body=Hola!%0AMe%20gustaría%20reservar%20este%20producto:%0A-%20Producto: " + productName + "%0A-%20Cantidad: 1";
  }

  showDetails (id : number){
    this.router.navigate(['/products/getProductDetail/' + id]);
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
    this.dataSource.getProducts(pageFilter);
    this.productService.getProducts(pageFilter).subscribe((a) => {
      this.products = a.data;
    });
  }

  loadProductsCities() {
    this.selection.clear();
    this.error = false;
    const pageFilter = new AnyPageFilter(
      this.input.nativeElement.value,
      [new AnyField(this.fields[5])],
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    this.dataSource.getProducts(pageFilter);
    this.productService.getProducts(pageFilter).subscribe((a) => {
      this.products = a.data;
    });
}
}