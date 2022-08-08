import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {NgxSpinnerService} from "ngx-spinner";

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
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit():
    void {
  }

  getTasks() {
    this.taskList = []
    this.userService.getTasks().subscribe(data => {
      this.taskList = data;
    })
  }

  logoutUser() {
    this.authService.logout().subscribe(data => {
      this.tokenService.signOut();
    });
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
