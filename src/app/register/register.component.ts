import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {

  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: [
        "",
        [
          Validators.required
        ]
      ],
      username: ["", [Validators.required]],
      name: ["", [Validators.required]],
    })
  }
  get formControl() {
    return this.registerForm.controls;
  }
  onRegister(): void {
    this.submitted = true;
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      const payload = this.registerForm.getRawValue();
      console.log('payload', payload)
      this.apiService.post('auth/register', payload).subscribe(response => {
        this.data = response;
        this.router.navigate(["/login"]);
      })
    }
  }

}
