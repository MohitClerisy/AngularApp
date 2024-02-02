import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  data: any;
  profile: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    // const payload = {
    //   email: "mohit@clerisysolutions.com",
    //   password: "csolution"
    // }

    // const myProfile = this.apiService.get('user/my-profile');
    // this.apiService.post('auth/login',payload).subscribe(response => {
    //   console.log(response);
    //   this.data = response;
    //   localStorage.setItem('token',this.data.token);
    //   myProfile.subscribe(response => {
    //     this.profile = response;
    //     console.log(this.profile);
    //   });
    // })

    this.apiService.get('me').subscribe(response => {
      this.profile = response;
      console.log(this.profile);
    });
  }

  /**
   * Logs the user out by clearing the token in local storage and navigating to the login page.
   *
   * @return {void} This function does not return a value.
   */
  logout(): void {
    this.apiService.post('logout',{}).subscribe(response => {
      localStorage.setItem('token', '');
      this.router.navigate(["/login"]);
      console.log(response);
    });
  }

}
