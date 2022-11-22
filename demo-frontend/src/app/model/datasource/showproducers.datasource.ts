import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, finalize } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { User } from "../user";
import { AnyPageFilter } from "../rest/filter";

export class ShowProducersDatasource extends DataSource<User> {
    producersSubject = new BehaviorSubject<User[]>([]);
    loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalElements: number;

    constructor(private userService: UserService) {
        super();
    }

    showProducers(pageFilter: AnyPageFilter) {
        this.producersSubject.next([]);
        this.loadingSubject.next(true);
        this.userService.showProducers(pageFilter).pipe(
            finalize(() => this.loadingSubject.next(false))
            ).subscribe(
                response => {
                    this.totalElements = response.totalElements;
                    this.producersSubject.next(response.data);
                }
            );
    }

    connect(): BehaviorSubject<User[]> {
        return this.producersSubject;
    }

    disconnect(): void {
        this.producersSubject.complete();
        this.loadingSubject.complete();
    }

}