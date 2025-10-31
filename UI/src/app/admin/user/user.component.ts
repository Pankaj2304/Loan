import { Router } from '@angular/router';
import { MessageService } from '../../core/services/message/message.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';

import { ApiUrl } from '../../core/apiUrl';
import { HttpService } from 'src/app/core/services/http/http.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public users = [];
  modalRef: BsModalRef;
  isSubmitted = false;
  selectedUser: any = null;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  emailPattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  telPattern = new RegExp(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  );
  searchText = "";
  take = 0;
  skip = 0;
  constructor(
    private modalService: BsModalService,
    private modal: NgbModal,
    private http: HttpService,
    private message: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  getUsers() {
    this.http.getData(`api/user/get-user-list?take=${this.take}&skip=${this.skip}&searchText=${this.searchText}`, null).subscribe(
      (resp: any) => {
        if (!!resp) {
          
          const result = resp.data;
          this.users = result;
          this.rerender();
        }
      },
      (error) => console.log(error)
    );
  }

  removeSearch() {
    if (this.searchText.trim().length == 0) {
      this.getUsers();
    }
  }
  

  rerender(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
  }

  /*** UnSubscribe the events to prevent memory leakage ***/
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  openModalDelete(template: TemplateRef<any>, user): void {
    this.selectedUser = user;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  decline() {
    this.modalRef.hide();
  }

 
  deleteData() {
    this.http.deleteData(`api/user/delete/${this.selectedUser.id}`, null).subscribe(
      (resp: any) => {
        if (!!resp) {
          this.modalRef.hide();
          this.message.showSuccess('User deleted Successfully');
          this.getUsers();
        }
      },
      (error) => console.log(error)
    );
  }

 
}
