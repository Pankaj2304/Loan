import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";

import { UserComponent } from "./user.component";
import { SidemenuComponent } from "./sidemenu/sidemenu.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelect2Module } from "ng-select2";

@NgModule({
  declarations: [UserComponent, SidemenuComponent],
  imports: [CommonModule, UserRoutingModule, NgbModule, NgSelect2Module],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersModule {}
