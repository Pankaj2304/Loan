import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressInformationRoutingModule } from './address-information.routing.module';
import { AddressInformationComponent } from './address-information.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddressInformationComponent],
  imports: [
    CommonModule,
    AddressInformationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddressInformationModule { }
