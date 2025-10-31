import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserSubject = new BehaviorSubject(null);
  currentUser = this.currentUserSubject.asObservable();

  callingUserSubject = new BehaviorSubject(null);
  callingUser = this.callingUserSubject.asObservable();
  currentUrl = '';
  constructor(private router: Router) {
    /********* Check currentUser from local storage **********/
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    let userData: any = null;
    try {
      userData = localStorage.getItem('_user')
        ? localStorage.getItem('_user')
        : null;
      userData = userData ? JSON.parse(userData) : null;
      this.currentUserSubject = new BehaviorSubject<any>(userData);
    } catch (error) {
      if (error instanceof SyntaxError) {
        this.removeUser();
      }
    }
  }

  /********* Get the current value of user **********/
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /********* Get the current value of user **********/
  public get currentUserRole(): any {
    if (!!this.currentUserValue) {
      return this.currentUserValue.result[0].ROLE;
    }
  }

  public get isAdmin(): any {
    
     if (!!this.currentUserValue) {
      return this.currentUserValue.isAdmin;
    }
  }

  public get isCustomer(): any {
    
    if (!!this.currentUserValue) {
      return this.currentUserValue.isCustomer;
    }
  }
  /********* Get the current user token **********/
  public get getUserToken(): any {
    
    if (!!this.currentUserValue) {
      return this.currentUserValue.token.token;
    }
  }

  /********* Set user in local storage **********/
  setUserLocalData(userData: any) {
    
    localStorage.setItem('_user', JSON.stringify(userData));
    const userName =
      userData ? userData.name: '';
    localStorage.setItem('username', userName);
    this.currentUserSubject.next(userData);
  }
  /********* Set call user Data **********/
  setCallUser(user: any): void {
    this.callingUserSubject.next(user);
  }

  /********* Remove user from local storage **********/
  // ******************Check Super Admin*************/
  public get isSuperAdmin(): any {
    if (!!this.currentUserValue) {
      return this.currentUserValue.result[0].IS_SUPERADMIN;
    }
  }

  public get isReception(): any {
    if (!!this.currentUserValue) {
      return this.currentUserValue.result[0].ROLE;
    }
  }

  removeUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('_user');
    if (this.currentUrl.includes('/admin/')) {
      this.router.navigate(['/admin/login-form']);
    } else if (this.currentUrl.includes('/admin')) {
      this.router.navigate(['/admin-login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /********* User Sign-Out **********/
  userSignOut() {
    this.removeUser();
  }
}
