import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public userName: string;
  user: any;
  public profileImg: 'assets/images/dashboard/profile.jpg';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.user = this.authService.getAuthUser();
  }

  logout(){
    // call the logout method from the auth service
    // navigate to the login page
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
