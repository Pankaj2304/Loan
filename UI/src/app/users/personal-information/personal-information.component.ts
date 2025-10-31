import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  _Form = new FormGroup({});
  isSubmitted = false;
  emailPattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  telPattern = new RegExp(
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  );
  constructor(private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private fb: FormBuilder,
    private message: MessageService,
    private http: HttpService) { }

  ngOnInit(): void {
    this.createForm();
    this.getUserInformation();
  }

  createForm() {
    this._Form = this.fb.group({
      Id:0,
      firstName: [
        '',
        [
          Validators.required,
        ],
      ],
      middleName: [''],
      userName: [''],
      lastName: [
        '',
        [
          Validators.required,
        ],
      ],
      email: [
        '',
        [
          Validators.required, Validators.pattern(this.emailPattern)
        ],
      ],
      phone: [
        '',
        [
          Validators.required, Validators.pattern(this.telPattern)
        ],
      ],
      dob: [
        '',
        [
          Validators.required,
        ],
      ],
      socialSecurityNumber: [
        '',
        [
          Validators.required,
        ]
      ],
      citizenShip: [
        '',
        [
          Validators.required,
        ]
      ],
      maritalStatus: [
        ''
      ],
      homePhone: [
        ''
      ],
      workPhone: [
        '1233'
      ],
      ext: [
        ''
      ]
    });
  }

  addUser() {
    debugger;
    this.isSubmitted = true;
    if (!this._Form.valid) {
      setTimeout(() => {
        this.isSubmitted = false;
      }, 10000);
      return;
    }

    const params = this._Form.value;
    this.http.postData("api/user/update", params).subscribe(
      (resp: any) => {
        if (!!resp) {
          this.isSubmitted = false;
          debugger;
          this.message.showSuccess("User Update successfully");
         }
      },
      (error) => console.log(error)
    );
  }

  getUserInformation() {
    this.http.getData("api/user/get", null).subscribe(
      (resp: any) => {
        if (!!resp) {
          debugger;
          this.fillForm(resp.data);
        }
      },
      (error) => console.log(error)
    );
  }

  fillForm(data) {
    this._Form.patchValue({
      Id: 0,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      socialSecurityNumber: data.socialSecurityNumber,
      citizenShip: data.citizenShip,
      maritalStatus: data.maritalStatus,
      homePhone: data.homePhone,
      workPhone: data.workPhone,
      ext: data.ext
    });
  }
}
