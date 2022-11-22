import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, finalize } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { Product } from "../product";
import { AnyPageFilter } from "../rest/filter";

export class ShowProductDatasource extends DataSource<Product> {
    productsSubject = new BehaviorSubject<Product[]>([]);
    loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalElements: number;

    constructor(private productService: ProductService) {
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
    getProductsCity(pageFilter: AnyPageFilter, city: string) {
        this.productsSubject.next([]);
        this.loadingSubject.next(true);
        this.productService.findCities(pageFilter, city).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            response => {
                this.totalElements = response.totalElements;
                this.productsSubject.next(response.data);
            }
        );
    }
    getProductsCityProducer(pageFilter: AnyPageFilter, city: string, producer: string) {
        this.productsSubject.next([]);
        this.loadingSubject.next(true);
        this.productService.findCitiesProducer(pageFilter, city, producer).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            response => {
                this.totalElements = response.totalElements;
                this.productsSubject.next(response.data);
            }
        );
    }
    getProductsType(pageFilter: AnyPageFilter, type: string) {
        this.productsSubject.next([]);
        this.loadingSubject.next(true);
        this.productService.findTypes(pageFilter, type).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            response => {
                this.totalElements = response.totalElements;
                this.productsSubject.next(response.data);
            }
        );
    }
    
    getProductsTypeProducer(pageFilter: AnyPageFilter, type: string, producer:string) {
        this.productsSubject.next([]);
        this.loadingSubject.next(true);
        this.productService.findTypesProducer(pageFilter, type, producer).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            response => {
                this.totalElements = response.totalElements;
                this.productsSubject.next(response.data);
            }
        );
    }

    getProductsCityType(pageFilter: AnyPageFilter, city: string, type: string) {
        this.productsSubject.next([]);
        this.loadingSubject.next(true);
        this.productService.findCityType(pageFilter, city, type).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            response => {
                this.totalElements = response.totalElements;
                this.productsSubject.next(response.data);
            }
        );
    }

    getProductsCityTypeProducer(pageFilter: AnyPageFilter, city: string, type: string, producer: string) {
        this.productsSubject.next([]);
        this.loadingSubject.next(true);
        this.productService.findCityTypeProducer(pageFilter, city, type, producer).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            response => {
                this.totalElements = response.totalElements;
                this.productsSubject.next(response.data);
            }
        );
    }

    getMyProducts(pageFilter: AnyPageFilter, login: string) {
        this.productsSubject.next([]);
        this.loadingSubject.next(true);
        this.productService.getMyProducts(pageFilter, login).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            response => {
                this.totalElements = response.totalElements;
                this.productsSubject.next(response.data);
            }
        );
    }

    connect(): BehaviorSubject<Product[]> {
        return this.productsSubject;
    }

    disconnect(): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }
}

