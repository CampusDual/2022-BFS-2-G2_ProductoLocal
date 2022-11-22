import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowProducersDatasource } from 'src/app/model/datasource/showproducers.datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, fromEvent, merge, Observable, Observer, tap } from 'rxjs';
import { AnyField, AnyPageFilter, SortFilter } from 'src/app/model/rest/filter';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import swal from 'sweetalert2';

@Component({
  templateUrl: './show-producers.component.html',
  styleUrls: ['./show-producers.component.scss']
})
export class ShowProducersComponent implements OnInit {

  dataSource: ShowProducersDatasource;
  displayedColumns = [
    'select',
    'login',
    'name',
    'surname',
    'nif',
    'city',
    'zip',
    'phone',
    'email',
  ];
  fields = ['login', 'name', 'surname', 'nif', 'city', 'zip', 'phone', 'email',];

  selection = new SelectionModel<User>(true, []);
  error = false;

  highlightedRow: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog
  ){ }

  ngOnInit() {
    this.dataSource = new ShowProducersDatasource(this.userService);
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'login'
    );
  this.dataSource.showProducers(pageFilter);
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadProducersPage();
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
      this.loadProducersPage();
      })
    )
    .subscribe();
  }

  loadProducersPage() {
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
    this.dataSource.showProducers(pageFilter);
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.producersSubject.value.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.producersSubject.value.length;
    return numSelected === numRows;
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.translate.instant('delete-user-confirmation'),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete();
        swal.fire(this.translate.instant('USER_REMOVE_SUCCESS'), '','success').then((res) => {
        return new Observable((observer: Observer<boolean>) =>
          observer.next(true)
        )});
      } else {
        swal.fire(this.translate.instant('USER_REMOVE_ERROR'), '','error').then((res) => {
        return new Observable((observer: Observer<boolean>) =>
        observer.next(false)
          )
        });
        }
      });
    }

  delete() {
    const user = this.selection.selected[0];
    this.selection.deselect(user);
    if (this.selection.selected && this.selection.selected.length === 0) {
      this.userService.deleteUser(user.login).subscribe((response) => {
        if (response.responseCode !== 'OK') {
          this.error = true;
        } else {
          this.loadProducersPage();
        }
      });
    } else {
      this.userService.deleteUser(user.login).subscribe((response) => {
        if (response.responseCode !== 'OK') {
          this.error = true;
        }
        this.delete();
      });
    }
  }

  
  onAdd() {
    this.router.navigate(['/users/createProducer']);
  }

  onEdit(row: User) {
    this.highlightedRow = row;
    this.router.navigate(['/users/getUser/producer/' + row.login]);
  }
}