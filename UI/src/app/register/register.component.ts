import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user/user.service';
import { MessageService } from '../core/services/message/message.service';
import { HttpService } from '../core/services/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  _Form: FormGroup;
  isSubmitted = false;
  reg_type = 'User Register';
  emailPattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  telPattern = new RegExp(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  );
  passwordPattern = new RegExp(/[!@#$%^&*()\[\]{}\\|;:'",<.>/?`~]/);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private fb: FormBuilder,
    private message: MessageService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.createForm();
    function resizeInnerDiv() {
      var height = $(window).height();
      var header_height = $(".header").height();
      var footer_height = $(".footer").height();
      var setheight = height - header_height;
      var trueheight = setheight - footer_height;
      $(".content").css("min-height", trueheight);
    }

    if ($('.content').length > 0) {
      resizeInnerDiv();
    }

    $(window).resize(function () {
      if ($('.content').length > 0) {
        resizeInnerDiv();
      }
    });
  }

  signup() {
    this.isSubmitted = true;
    // if (this._Form.value.IsChecked == false) {
    //   this.message.showError("Please Accept privacy policy");
    //   true;
    // }
    if (!this._Form.valid) {
      setTimeout(() => {
        this.isSubmitted = false;
      }, 10000);
      return;
    }

    const params = this._Form.value;
    this.http.postData("api/user/register", params).subscribe(
      (resp: any) => {
        if (!!resp) {
          this.isSubmitted = false;
          debugger;
          this.message.showSuccess("User registered successfully");
          this.createForm();
          var _id = btoa(resp.data.id);
          this.router.navigateByUrl('/email-sent/'+_id);
        }
      },
      (error) => console.log(error)
    );
  }

  createForm() {
    this._Form = this.fb.group({
      FirstName: [
        '',
        [
          Validators.required,
        ],
      ],
      LastName: [
        '',
        [
          Validators.required,
        ],
      ],
      Email: [
        '',
        [
          Validators.required, Validators.pattern(this.emailPattern)
        ],
      ],
      Phone: [
        '',
        [
          Validators.required, Validators.pattern(this.telPattern)
        ],
      ],
      Password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      IsChecked: [false, [
        Validators.required,
      ]]
    });

    const password = document.getElementById("password-input");
    const passwordAlert = document.getElementById("password-alert");
    const requirements = document.querySelectorAll(".requirements");
    const leng = document.querySelector(".leng");
    const bigLetter = document.querySelector(".big-letter");
    const num = document.querySelector(".num");
    const specialChar = document.querySelector(".special-char");

    requirements.forEach((element) => element.classList.add("wrong"));
    if (password != null && password != undefined) {
      password.addEventListener("focus", () => {
        passwordAlert.classList.remove("d-none");
        if (!password.classList.contains("is-valid")) {
          password.classList.add("is-invalid");
        } else {
          passwordAlert.classList.add("d-none");
        }
      });

      password.addEventListener("input", () => {
        passwordAlert.classList.remove("d-none");
        if (!password.classList.contains("is-valid")) {
          password.classList.add("is-invalid");
        } else {
          passwordAlert.classList.add("d-none");
        }
        const value = this._Form.value.Password //password.value;
        const isLengthValid = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*()\[\]{}\\|;:'",<.>/?`~]/.test(value);

        leng.classList.toggle("good", isLengthValid);
        leng.classList.toggle("wrong", !isLengthValid);
        bigLetter.classList.toggle("good", hasUpperCase);
        bigLetter.classList.toggle("wrong", !hasUpperCase);
        num.classList.toggle("good", hasNumber);
        num.classList.toggle("wrong", !hasNumber);
        specialChar.classList.toggle("good", hasSpecialChar);
        specialChar.classList.toggle("wrong", !hasSpecialChar);

        const isPasswordValid = isLengthValid && hasUpperCase && hasNumber && hasSpecialChar;

        if (isPasswordValid) {
          password.classList.remove("is-invalid");
          password.classList.add("is-valid");

          requirements.forEach((element) => {
            element.classList.remove("wrong");
            element.classList.add("good");
          });

          passwordAlert.classList.remove("alert-warning");
          passwordAlert.classList.add("alert-success");
        } else {
          password.classList.remove("is-valid");
          password.classList.add("is-invalid");

          passwordAlert.classList.add("alert-warning");
          passwordAlert.classList.remove("alert-success");
        }
        passwordAlert.classList.remove("d-none");
        if (!password.classList.contains("is-valid")) {
          password.classList.add("is-invalid");
        } else {
          passwordAlert.classList.add("d-none");
        }
      });

      password.addEventListener("blur", () => {
        passwordAlert.classList.add("d-none");
      });
    }

  }

}
