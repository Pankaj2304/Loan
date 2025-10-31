import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {

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
