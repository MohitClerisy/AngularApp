import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { TestComponent } from './test.component';
import { ApiService } from '../api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get', 'post']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfile on component initialization', () => {
    const getProfileSpy = spyOn(component, 'getProfile');
    component.ngOnInit();
    expect(getProfileSpy).toHaveBeenCalled();
  });

  it('should initialize profile', fakeAsync(() => {
    apiServiceSpy.get.and.returnValue(of(jasmine.anything()));

    component.getProfile();
    tick();

    expect(apiServiceSpy.get).toHaveBeenCalledWith('me');
    expect(component.profile).toBeDefined();
  }));

  it('should call API service on logout, clear token, navigate, and show snack bar message', fakeAsync(() => {
    const mockApiResponse = { message: 'Logout successful' };
    apiServiceSpy.post.and.returnValue(of(mockApiResponse));

    component.logout();
    tick();

    expect(apiServiceSpy.post).toHaveBeenCalledWith('logout', {});
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(snackBarSpy.open).toHaveBeenCalledWith(mockApiResponse.message, 'Close', { duration: 2000 });
  }));

});
