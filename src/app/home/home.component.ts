import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  taskList: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit():
    void {
  }

  getTasks() {
    this.taskList = []
    this.userService.getTasks().subscribe(data => {
      this.taskList = data;
      this.showSuccess();
    })
  }

  logoutUser() {
    this.authService.logout().subscribe(data => {
      this.tokenService.signOut();
      this.router.navigate(['/sign-in']);
    });
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  showSuccess() {
    this.notificationService.showSuccess("Success");
  }
  showWarn() {
    this.notificationService.showWarn("Warning");
  }
  showError() {
    this.notificationService.showError("Error");
  }
  showInfo() {
    this.notificationService.showInfo("Info");
  }
}
