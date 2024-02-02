import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { ApiService } from '../api.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['post']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with the expected form controls', () => {
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should set submitted to true on form submission', () => {
    component.onLogin();
    expect(component.submitted).toBe(true);
  });

  it('should not call API service if the form is invalid', () => {
    component.onLogin();
    expect(apiServiceSpy.post).not.toHaveBeenCalled();
  });

  it('should open snack bar message', () => {
    component.openSnackBar('test');
    expect(snackBarSpy.open).toHaveBeenCalledWith('test', 'Close', { duration: 2000 });
  });

  it('should return login form controls', () => {
    expect(component.formControl).toEqual(component.loginForm.controls);
  });

  it('should call API service and navigate on successful form submission', fakeAsync(() => {
    const mockApiResponse = { access_token: 'fakeToken', expires_in: 3600 };
    apiServiceSpy.post.and.returnValue(of(mockApiResponse));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    component.onLogin();
    tick();

    expect(apiServiceSpy.post).toHaveBeenCalledWith('login', { email: 'test@example.com', password: 'password' });
    expect(localStorage.getItem('token')).toBe('fakeToken');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Your Token will expire in 3600 seconds.', 'Dismiss', { duration: 2000 });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/test']);
  }));
});
