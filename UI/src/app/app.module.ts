import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";

import { NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { Daterangepicker } from "ng2-daterangepicker";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { LinkService } from "./link.service";
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgbDateCustomParserFormatter } from './core/provider/datformatprovider';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    Daterangepicker,
  ],
  providers: [LinkService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }],
  bootstrap: [AppComponent],
})
export class AppModule {}
