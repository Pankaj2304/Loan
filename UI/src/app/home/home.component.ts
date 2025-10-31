import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CommonServiceService } from "../common-service.service";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { SlickCarouselComponent } from "ngx-slick-carousel";
declare const $: any;

export interface Doctors {
  id: number;
  doctor_name: string;
  speciality: string;
  Education: string;
  location: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  // encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild("slickModal1") slickModal1: SlickCarouselComponent;
  @ViewChild("slickModal2") slickModal2: SlickCarouselComponent;
  @ViewChild("slickModal3") slickModal3: SlickCarouselComponent;
  specialityList: any = [];
  doctors: any = [];
  slidepage: any;
  employeeCtrl = new FormControl();
  filteredEmployee: Observable<Doctors[]>;
  blogs: any = [];
  keyword = "name";
  searchDoctor = [];
  public countries = [
    {
      id: 1,
      name: "Albania",
      img: "image",
    },
    {
      id: 2,
      name: "Belgium",
    },
    {
      id: 3,
      name: "Denmark",
    },
    {
      id: 4,
      name: "Montenegro",
    },
    {
      id: 5,
      name: "Turkey",
    },
    {
      id: 6,
      name: "Ukraine",
    },
    {
      id: 7,
      name: "Macedonia",
    },
    {
      id: 8,
      name: "Slovenia",
    },
    {
      id: 9,
      name: "Georgia",
    },
    {
      id: 10,
      name: "India",
    },
    {
      id: 11,
      name: "Russia",
    },
    {
      id: 12,
      name: "Switzerland",
    },
  ];
  constructor(
    public router: Router,
    public commonService: CommonServiceService
  ) {
    this.filteredEmployee = this.employeeCtrl.valueChanges.pipe(
      startWith(""),
      map((employee) =>
        employee ? this._filterEmployees(employee) : this.doctors.slice()
      )
    );
  }

  ngOnInit() {
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
    window.scrollTo(0, 0);
    this.getspeciality();
    this.getDoctors();
    this.getblogs();

    // User's voice slider
    $(".testi-slider").each(function () {
      var $show = $(this).data("show");
      var $arr = $(this).data("arrow");
      var $dots = !$arr;
      var $m_show = $show;
      if ($show == 3) $m_show = $show - 1;
      $(this).slick({
        slidesToShow: $show,
        slidesToScroll: 1,
        arrows: $arr,
        autoplay: false,
        autoplaySpeed: 6000,
        adaptiveHeight: true,
        prevArrow:
          '<button type="button" class="prev-nav"><i class="icon ion-ios-arrow-back"></i></button>',
        nextArrow:
          '<button type="button" class="next-nav"><i class="icon ion-ios-arrow-forward"></i></button>',
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: $m_show,
              slidesToScroll: 1,
              infinite: true,
              arrows: $arr,
              dots: $dots,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      });
    });
  }
  private _filterEmployees(value: string): Doctors[] {
    const filterValue = value.toLowerCase();
    return this.doctors.filter(
      (state) => state.doctor_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  slides = [
    {
      name: "Cataract Surgery",
      img: "assets/img/general-01.jpg",
    },
    {
      name: "Cesarean section",
      img: "assets/img/general-02.jpg",
    },
    {
      name: "Cholecystectomy",
      img: "assets/img/general-03.jpg",
    },
    {
      name: "Partial colectomy",
      img: "assets/img/general-04.jpg",
    },
  ];

  solutionSliderConfig = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: true,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  };

  slides1 = [
    {
      name: "Michelle Johnson",
      img: "assets/img/our-surgeon-01.jpg",
    },
    {
      name: "Davis John",
      img: "assets/img/our-surgeon-02.jpg",
    },
    {
      name: "Ruth Burns",
      img: "assets/img/our-surgeon-03.jpg",
    },
    {
      name: "Villareal",
      img: "assets/img/our-surgeon-04.jpg",
    },
  ];

  solutionSliderConfig1 = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: true,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  };

  next() {
    this.slickModal1.slickNext();
  }

  prev() {
    this.slickModal1.slickPrev();
  }

  getspeciality() {
    this.commonService.getSpeciality().subscribe((res) => {
      this.specialityList = res;
    });
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe((res) => {
      this.doctors = res;
      this.slidepage = {
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
      this.countries = [];
      this.doctors.forEach((index, i) => {
        this.countries.push({
          id: index.id,
          name: index.doctor_name,
        });
      });
    });
  }

  getblogs() {
    this.commonService.getBlogs().subscribe((res) => {
      this.blogs = res;
    });
  }

  selectEvent(item) {
    let filter = this.countries.filter((a) => a.name === item.name);
    this.router.navigateByUrl("/patients/doctor-profile?id=" + filter[0].id);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  //// next step 2
  sliderContent = [
    {
      solu_img: "assets/img/solution1.png",
      speciality_img: "assets/img/specialities/specialities-01.png",
      speciality: "SURGERY",
      speciality_title: "Heart Surgery",
      speciality_desc:
        "Lorem Ipsum is simply dummy text  the printing and typesetting industry.",
    },
    {
      solu_img: "assets/img/solution2.png",
      speciality_img: "assets/img/specialities/specialities-02.png",
      speciality: "SAVING LIVES",
      speciality_title: "Valve Diseases",
      speciality_desc:
        "Lorem Ipsum is simply dummy text  the printing and typesetting industry.",
    },
    {
      solu_img: "assets/img/solution3.png",
      speciality_img: "assets/img/specialities/specialities-03.png",
      speciality: "GREAT CARE",
      speciality_title: "Children’s services",
      speciality_desc:
        "Lorem Ipsum is simply dummy text  the printing and typesetting industry.",
    },
    {
      solu_img: "assets/img/solution1.png",
      speciality_img: "assets/img/specialities/specialities-01.png",
      speciality: "SURGERY",
      speciality_title: "Heart Surgery",
      speciality_desc:
        "Lorem Ipsum is simply dummy text  the printing and typesetting industry.",
    },
    {
      solu_img: "assets/img/solution2.png",
      speciality_img: "assets/img/specialities/specialities-02.png",
      speciality: "SAVING LIVES",
      speciality_title: "Heart Surgery",
      speciality_desc:
        "Lorem Ipsum is simply dummy text  the printing and typesetting industry.",
    },
    {
      solu_img: "assets/img/solution3.png",
      speciality_img: "assets/img/specialities/specialities-03.png",
      speciality: "GREAT CARE",
      speciality_title: "Children’s services",
      speciality_desc:
        "Lorem Ipsum is simply dummy text  the printing and typesetting industry.",
    },
    {
      solu_img: "assets/img/solution1.png",
      speciality_img: "assets/img/specialities/specialities-01.png",
      speciality: "SURGERY",
      speciality_title: "Heart Surgery",
      speciality_desc:
        "Lorem Ipsum is simply dummy text  the printing and typesetting industry.",
    },
  ];
  nextslide() {
    this.slickModal2.slickNext();
  }

  prevslide() {
    this.slickModal2.slickPrev();
  }

  nextpage() {
    this.slickModal3.slickNext();
  }

  prevpage() {
    this.slickModal3.slickPrev();
  }
}
