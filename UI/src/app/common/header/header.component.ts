import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  Inject,
} from "@angular/core";
import { Event, NavigationStart, Router, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { Location } from "@angular/common";
import { CommonServiceService } from "./../../common-service.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  auth: boolean = false;
  isPatient: boolean = false;
  splitVal;
  url;
  base;
  page;
  constructor(
    @Inject(DOCUMENT) private document,
    private cdr: ChangeDetectorRef,
    public router: Router,
    location: Location,
    public commonService: CommonServiceService
  ) {
    this.commonService.message.subscribe((res) => {
      
      if (res === "patientLogin") {
        this.auth = true;
       }
      if (res === "logout") {
        this.auth = false;
        this.isPatient = false;
      }
    });
  }

  ngOnInit(): void {
      // Sidebar
  
  if($(window).width() <= 991){
    var Sidemenu = function() {
      this.$menuItem = $('.main-nav a');
    };
    
    function init() {
      var $this = Sidemenu;
      $('.main-nav a').on('click', function(e) {
        if($(this).parent().hasClass('has-submenu')) {
          e.preventDefault();
        }
        if(!$(this).hasClass('submenu')) {
          $('ul', $(this).parents('ul:first')).slideUp(350);
          $('a', $(this).parents('ul:first')).removeClass('submenu');
          $(this).next('ul').slideDown(350);
          $(this).addClass('submenu');
        } else if($(this).hasClass('submenu')) {
          $(this).removeClass('submenu');
          $(this).next('ul').slideUp(350);
        }
      });
    }
  
    // Sidebar Initiate
    init();
    }
    if (localStorage.getItem("auth") === "true") {
      this.auth = true;
      this.isPatient =
        localStorage.getItem("patient") === "true" ? true : false;
    }
     this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('html').removeClass('menu-opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.main-wrapper').removeClass('slide-nav');
      }
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (this.base === 'doctor'){
          this.isPatient = false;
        } 
        else if (this.base === 'users'){
          this.isPatient = true;
        } 
        this.splitVal = event.url.split("/");
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
        if (
          this.base === "doctor" ||
          (this.base === "users" && this.page === "dashboard") ||
          this.base === "change-password" ||
          this.base === "voice-call" ||
          this.base === "video-call" ||
          (this.base === "users" && this.page === "favourites") ||
          (this.base === "users" && this.page === "message") ||
          (this.base === "users" && this.page === "settings")||
          (this.base === "users" && this.page === "add-billing")||
          (this.base === "users" && this.page === "add-prescription") ||
          this.base === "chat-doctor" ||
          (this.base === "users" && this.page === "chat-doctor")||
          (this.base === "users" && this.page === "edit-billing") ||
          (this.base === "users" && this.page === "edit-prescription")||
          (this.base === "users" && this.page === "patient-profile")
        ) {
          this.auth = true;
        } else {
          this.auth = false;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.loadDynmicallyScript("assets/js/script.js");
  }
  loadDynmicallyScript(js) {
    var script = document.createElement("script");
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }
  doSomethingWhenScriptIsLoaded() {}
  change(name) {
    this.page = name;
    this.commonService.nextmessage("main");
  }

  mapGrid() {
    this.router.navigate(["/map-grid"]);
  }

  mapList() {
    this.router.navigate(["/map-list"]);
  }

  addStyle(val) {
    // if (val === "doctor") {
    //   if (document.getElementById("doctor").style.display == "block") {
    //     document.getElementById("doctor").style.display = "none";
    //   } else {
    //     document.getElementById("doctor").style.display = "block";
    //   }
    // }
    // if (val === "patient") {
    //   if (document.getElementById("patient").style.display == "block") {
    //     document.getElementById("patient").style.display = "none";
    //   } else {
    //     document.getElementById("patient").style.display = "block";
    //   }
    // }
    // if (val === "pages") {
    //   if (document.getElementById("pages").style.display == "block") {
    //     document.getElementById("pages").style.display = "none";
    //   } else {
    //     document.getElementById("pages").style.display = "block";
    //   }
    // }
    // if (val === "blog") {
    //   if (document.getElementById("blog").style.display == "block") {
    //     document.getElementById("blog").style.display = "none";
    //   } else {
    //     document.getElementById("blog").style.display = "block";
    //   }
    // }
  }

  logout() {
    localStorage.clear();
    this.auth = false;
    this.isPatient = false;
    this.router.navigate(["/login-page"]);
  }

  home() {
    this.commonService.nextmessage("main");
    this.router.navigateByUrl("/").then(() => {
      this.router.navigate(["/"]);
    });
  }

  navigate(name) {
    this.page = name;
    if (name === "Admin") {
      this.router.navigate(["/admin"]);
      this.commonService.nextmessage("admin");
    }
  }
}
