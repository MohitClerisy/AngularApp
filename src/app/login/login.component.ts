import { Component, OnInit, VERSION } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  submitted = false;
  data: any;
  profile: any;
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: [
        "",
        [
          Validators.required,
          // Validators.pattern(
          //   "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          // )
        ]
      ]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      const payload = this.loginForm.getRawValue();
      this.apiService.post('login', payload).subscribe(response => {
        this.data = response;
        localStorage.setItem('token', this.data.access_token);
        this.router.navigate(["/test"]);
      })
    }
  }

}
