import { Component, OnInit } from "@angular/core";
import { Event, NavigationStart, Router } from "@angular/router";
import { CommonServiceService } from "../common-service.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-users",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  splitVal;
  base = "Users";
  page = "Dashboard";
  url;
  userSideBar: boolean = false;
  breadcrum = true
  showSelect = false
  constructor(
    private router: Router,
    location: Location,
    public commonService: CommonServiceService
  ) {
    this.userSideBar = true;
    //  if (
    //    router.url === '/users/dashboard' ||
    //    router.url === '/users/favourites' ||
    //    router.url === '/users/settings' ||
    //    router.url === '/users/dependent' ||
    //    router.url === '/users/accounts' ||
    //    router.url === '/users/orders' ||
    //    router.url === '/users/medical-records' ||
    //    router.url === '/users/medical-details' 
    // ) {
    //   this.userSideBar = true;
    // } else {
    //   this.userSideBar = false;
    // }
    if (router.url === '/users/message'){
      this.breadcrum = false
    }else{
      this.breadcrum = true
    }
    
    if (router.url === '/users/search-doctor'){
      this.showSelect = true
    }else{
      this.showSelect = false
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // if (
        //   event.url === '/users/dashboard' ||
        //   event.url === '/users/favourites' ||
        //   event.url === '/users/settings' ||
        //   event.url === '/users/dependent' ||
        //   event.url === '/users/accounts' ||
        //   event.url === '/users/orders' ||
        //   event.url === '/users/medical-records' ||
        //   event.url === '/users/medical-details' ||
        //   event.url === '/users/patients-change-password'
        // ) {
        //   this.userSideBar = true;
        // } else {
        //   this.userSideBar = false;
        // }
      }
      //  if (event instanceof NavigationStart) {
      //   if (
      //     event.url === '/users/chat-doctor' || router.url === 'patients/message'
          
      //   ) {
      //     this.breadcrum = false
      //   } else {
      //     this.breadcrum = true
      //   }
      // }
      if (event instanceof NavigationStart) {
        if (
          event.url === '/users/search-doctor'
          
        ) {
          this.showSelect = true
        } else {
          this.showSelect = false
        }
      }
    });
    this.url = location.path();
    // if (
    //   this.url === "/users/dashboard" ||
    //   this.url === "/users/favourites" ||
    //   this.url === "/users/settings" 
    // ) {
    //   this.userSideBar = true;
    // } else {
    //   this.userSideBar = false;
    // }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split("/");
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
  }
}
