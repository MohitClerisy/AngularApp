import { Component, OnInit, VERSION } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private apiService: ApiService,
    private snackBar: MatSnackBar
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

  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
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
        this.openSnackBar(`Your Token will expire in ${this.data.expires_in} seconds.`, 'Dismiss');
        this.router.navigate(["/test"]);
      })
    }
  }

}
