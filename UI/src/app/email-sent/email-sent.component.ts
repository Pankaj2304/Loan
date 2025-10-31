import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { MessageService } from '../core/services/message/message.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../core/services/http/http.service';
import { UserService } from '../core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.css']
})
export class EmailSentComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private message: MessageService,
    private http: HttpService,
    public commonService: CommonServiceService) { }

  ngOnInit(): void {
    
  }

  sendVerificationLink() {
    var id = this.route.snapshot.params.id;
    var _id=atob(id);
    var url = 'api/user/send-verification-email/' + _id;

    this.http.getData(url, null).subscribe(
      (response) => {
        if (!!response) {
          this.message.showSuccess('Email Verification link sent successfully');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
