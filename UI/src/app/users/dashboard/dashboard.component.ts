import { Component, OnInit } from '@angular/core';
import {CommonServiceService  } from './../../common-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appointments ;
  patients ;

  constructor(public commonService:CommonServiceService) { }

  ngOnInit(): void {
    // Content div min height set
  
  function resizeInnerDiv() {
    var height = $(window).height();  
    var header_height = $(".header").height();
    var footer_height = $(".footer").height();
    var setheight = height - header_height;
    var trueheight = setheight - footer_height;
    $(".content").css("min-height", trueheight);
  }
  
  if($('.content').length > 0 ){
    resizeInnerDiv();
  }

  $(window).resize(function(){
    if($('.content').length > 0 ){
      resizeInnerDiv();
    }
  });
    this.getPatients();
    this.getAppointments();
  }

  getAppointments() {
    this.commonService.getAppointments()
      .subscribe(res=>{
        this.appointments = res;
        let scope = this;
        this.appointments.forEach(index=>{
          let filter = scope.patients.filter(a=>a.key === index.patient_key);
          if(filter.length != 0) {
            index['patients'] = filter[0];
          }
        })
       
      })
  }

  getPatients() {
    this.commonService.getpatients()
    .subscribe(res=>{
      this.patients = res;
    })
  }


 
}
