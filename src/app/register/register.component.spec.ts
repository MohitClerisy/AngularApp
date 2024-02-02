import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['post']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm with the expected form controls', () => {
    expect(component.registerForm.get('username')).toBeDefined();
    expect(component.registerForm.get('name')).toBeDefined();
    expect(component.registerForm.get('email')).toBeDefined();
    expect(component.registerForm.get('password')).toBeDefined();
  });

  it('should set submitted to true on form submission', () => {
    component.onRegister();
    expect(component.submitted).toBe(true);
  });

  it('should not call API service if the form is invalid', () => {
    component.onRegister();
    expect(apiServiceSpy.post).not.toHaveBeenCalled();
  });

  it('should return register form controls', () => {
    expect(component.formControl).toEqual(component.registerForm.controls);
  });

  it('should call API service and navigate on successful form submission', fakeAsync(() => {
    apiServiceSpy.post.and.returnValue(of(jasmine.anything()));
    component.registerForm.setValue({ username: 'test',name: 'test', email: 'test@example.com', password: 'password' });
    component.onRegister();
    tick();

    expect(apiServiceSpy.post).toHaveBeenCalledWith('register', { username: 'test',name: 'test', email: 'test@example.com', password: 'password' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
