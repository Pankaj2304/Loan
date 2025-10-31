import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressInformationComponent } from './address-information.component';

const routes: Routes = [
	{
		path : '',
		component: AddressInformationComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressInformationRoutingModule { }
