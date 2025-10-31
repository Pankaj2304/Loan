import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonServiceService } from '../common-service.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../core/services/message/message.service';
import { HttpService } from '../core/services/http/http.service';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private fb: FormBuilder,
    private message: MessageService,
    private http: HttpService,
    public commonService: CommonServiceService
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
        ],
      ],
      password: ['', [Validators.required]],
     
    });
  }

  ngOnInit(): void {
   this.user.userSignOut();
  }

  login() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      setTimeout(() => {
        this.isSubmitted = false;
      }, 10000);
      return;
    }
    const params = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      };
    var url = 'api/user/login';

    this.http.postData(url, params).subscribe(
      (response) => {
        if (!!response) {
          
          this.user.setUserLocalData(response.data);
          this.message.showSuccess('Login Successful');
          localStorage.setItem('auth', 'true');
          this.commonService.nextmessage('patientLogin');
          this.router.navigate(['/users/dashboard']); 
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  

}
