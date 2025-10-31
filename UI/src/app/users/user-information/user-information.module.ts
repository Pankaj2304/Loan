import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInformationRoutingModule } from './user-information.routing.module';
import { UserInformationComponent } from './user-information.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserInformationComponent],
  imports: [
    CommonModule,
    UserInformationRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserInformationModule { }
