import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    DataTablesModule,
    FormsModule,
    CommonModule,
    NgbModule,
    Daterangepicker,
    NgSelect2Module,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
