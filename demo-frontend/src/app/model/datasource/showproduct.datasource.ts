import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { Observable, BehaviorSubject, finalize } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { Product } from "../product";
import { AnyPageFilter } from "../rest/filter";

export class ShowProductDatasource extends DataSource<Product> {
    productsSubject = new BehaviorSubject<Product[]>([]);
    loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalElements: number;

    constructor(private productService: ProductService){
        super();
    }

    getProducts(pageFilter: AnyPageFilter) {
        this.productsSubject.next([]);
        this.loadingSubject.next(true);
        this.productService.getProducts(pageFilter).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            response => {
                this.totalElements = response.totalElements;
                this.productsSubject.next(response.data);
            }
        );
    }

    connect(collectionViewer: CollectionViewer): Observable<readonly Product[]> {
        throw new Error("Method not implemented.");
    }
    disconnect(collectionViewer: CollectionViewer): void {
        throw new Error("Method not implemented.");
    }
}

