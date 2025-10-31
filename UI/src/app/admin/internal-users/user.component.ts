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
  newPassword = '';
  confirmPassword = '';
  selectedUser: any = null;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  emailPattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  telPattern = new RegExp(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  );
  registerForm = new FormGroup({});
  roleList = [];
  searchText = '';
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
    this.createSignupForm();
    this.getUsers();
    this.getRoles();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  getUsers() {
    this.http.getData(`api/admin/get-admin-user-list?take=${this.take}&skip=${this.skip}&searchText=${this.searchText}`, null).subscribe(
      (resp: any) => {
        if (!!resp) {
          this.users = resp.data;
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
  getRoles() {
    this.http.getData('api/admin/get-roles', null).subscribe(
      (resp: any) => {
        if (!!resp) {
          this.roleList = resp.data;
        }
      },
      (error) => console.log(error)
    );
  }

  /*** Open Reset Password Modal ***/
  openModal(template: TemplateRef<any>, user): void {
    this.selectedUser = user;
    this.fillupForm(user);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-md modal-dialog-centered',
    });
  }

  submitPassword(form: NgForm): void {
    this.isSubmitted = true;
    if (!form.valid || this.newPassword !== this.confirmPassword) {
      setTimeout(() => {
        this.isSubmitted = false;
      }, 10000);
      return;
    }
    if (this.newPassword.length < 8) {
      this.message.showError('Password should be of 8 characters!');
      return;
    }
    const params = {
      id: this.selectedUser.ID,
      password: this.newPassword,
    };
    this.http.postData("api/admin/changepassword", params).subscribe(
      (resp: any) => {
        if (!!resp) {
          this.message.showSuccess('Password Changed Successfully!');
          this.modalRef.hide();
        }
      },
      (error) => console.log(error)
    );
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

  createSignupForm() {
    this.registerForm = this.fb.group({
      id: 0,
      firstName: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(this.telPattern)]],
      email: [
        '',
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: ['Test@123', [Validators.required]],
      lastName: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
    });
  }

  fillupForm(user) {
    this.registerForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      mobile: user.mobile,
      email: user.email,
      lastName: user.lastName,
      roleId: user.roleId,
      });
  }
  submitUser() {
    this.isSubmitted = true;

    if (!this.registerForm.valid) {
      setTimeout(() => {
        this.isSubmitted = false;
      }, 10000);
      return;
    }
    const params = this.registerForm.value;
    this.http.postData(`api/admin/AddAdminUser`, params).subscribe(
      (resp: any) => {
        if (!!resp) {
         
            this.modalRef.hide();
            this.message.showSuccess('User added Successfully');
            this.getUsers();
          
        }
      },
      (error) => console.log(error)
    );
  }

  openModalUser(template: TemplateRef<any>): void {
    this.createSignupForm();
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
    this.isSubmitted = false;
  }

  openModalDelete(template: TemplateRef<any>, user): void {
    this.selectedUser = user;
    this.fillupForm(user);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  decline() {
    this.modalRef.hide();
  }

  deleteData() {
    debugger;
    this.http.deleteData(`api/admin/delete/${this.selectedUser.id}`, null).subscribe(
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
