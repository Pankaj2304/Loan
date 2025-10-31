import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

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
  }

}
