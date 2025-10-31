import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailSentRoutingModule } from './email-sent-routing.module';
import { EmailSentComponent } from './email-sent.component';


@NgModule({
  declarations: [EmailSentComponent],
  imports: [
    CommonModule,
    EmailSentRoutingModule
  ],
  exports: [
    EmailSentRoutingModule
  ]
})
export class EmailSentModule { }
