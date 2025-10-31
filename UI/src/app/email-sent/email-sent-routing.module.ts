import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailSentComponent } from './email-sent.component';

const routes: Routes = [
	{
		path : '',
		component: EmailSentComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailSentRoutingModule { }
