import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { HttpService } from '../../services/http/http.service';


@Component({
  selector: 'app-customer-dropdown',
  templateUrl: './customer-drop-down.component.html',
})
export class CustomerDropDownComponent implements OnInit {
  @Output() selectedCustomer = new EventEmitter<number>();
  @Input() placeholder = 'Search by Customer';

  public customerList: Observable<any>;
  customerLoading = false;
  minLengthTerm = 3;
  public customerUserId = null;
  searchText = new Subject<string>();
  constructor(private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadCustomer();
  }

  trackByFn(item: any) {
    return item.userID;
  }

  oncustomerSelected(event) {
    const data =  event.userID;
    this.selectedCustomer.emit(data);
  }
  loadCustomer() {
    this.customerList = concat(
      of([]), // default items
      this.searchText.pipe(
        filter((res) => {
          return res !== null && res.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => (this.customerLoading = true)),
        switchMap((term) => {
          return this.http
            .getCustomerForSearch(term)
            .pipe(
              catchError(() => of([])), // empty list on error
              tap(() => (this.customerLoading = false))
            );
        })
      )
    );
  }
}
