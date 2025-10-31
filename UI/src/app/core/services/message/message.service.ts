
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  isMobile = false;
  constructor(
    private toastr: ToastrService
  ) {
   
  }

  showSuccess(title: string) {
    this.toastr.success(title);
  }

  showError(title: string) {
    this.toastr.error(title);
  }
}
