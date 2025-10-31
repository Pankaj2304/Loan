import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/common-service.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    var url = 'api/admin/login';

    this.http.postData(url, params).subscribe(
      (response) => {
        if (!!response) {
          this.user.setUserLocalData(response.data);
          this.message.showSuccess('Login Successful');
          localStorage.setItem('auth', 'true');
          this.commonService.nextmessage('admin');
          this.router.navigate(['/admin/dashboard']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }




}
