import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { ShowProductDatasource } from 'src/app/model/datasource/showproduct.datasource';
import { Product } from 'src/app/model/product';
import { AnyField, AnyPageFilter, SortFilter } from 'src/app/model/rest/filter';
import { ProductService } from 'src/app/services/product.service';

@Component({
  //selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  dataSource: ShowProductDatasource;
  displayedColumns = [
    'name',
    'quantity',
    'description',
    'typeProd',
    'price'
  ];
  fields = ['name', 'quantity', 'description', 'typeProd', 'price'];

  selection = new SelectionModel<Product>(true, []);
  error = false;

  //@ViewChild('edit') editTemplate: any;
  highlightedRow: Product;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private productService: ProductService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit() {
    this.dataSource = new ShowProductDatasource(this.productService);
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0, 
      20,
      'name'
    );
    this.dataSource.getProducts(pageFilter);
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.selection.clear();
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadProductsPage();
        })
      )
      .subscribe();
  }

  loadProductsPage() {
    this.selection.clear();
    this.error = false;
    const pageFilter = new AnyPageFilter(
      this.input.nativeElement.value,
      this.fields.map((field) => new AnyField(field)),
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    pageFilter.order = [];
    pageFilter.order.push(
      new SortFilter(this.sort.active, this.sort.direction.toString())
    );
    this.dataSource.getProducts(pageFilter);
  }

  masterToggle(){}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.productsSubject.value.length;
    return numSelected === numRows;
  }

  onDelete(){

  }

  onAdd(){

  }

  onEdit(row: Product) {
    this.highlightedRow = row;
    this.router.navigate(['/contacts/edit/' + row.id]);
  }

  }


