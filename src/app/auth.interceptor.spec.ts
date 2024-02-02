import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add an Authorization header with the token to the request if token exists in localStorage', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, controller: HttpTestingController) => {
      const testUrl = '/api/test';
      const testResponse = { data: 'test' };

      localStorage.setItem('token', 'fakeToken');

      http.get(testUrl).subscribe((data) => {
        expect(data).toEqual(testResponse);
      });

      const req = httpTestingController.expectOne(testUrl);

      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe('Bearer fakeToken');

      req.flush(testResponse);
    }
  ));

  it('should not add Authorization header to the request if token is not present in localStorage', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, controller: HttpTestingController) => {
      const testUrl = '/api/test';
      const testResponse = { data: 'test' };

      localStorage.removeItem('token');

      http.get(testUrl).subscribe((data) => {
        expect(data).toEqual(testResponse);
      });

      const req = httpTestingController.expectOne(testUrl);

      expect(req.request.headers.has('Authorization')).toBeFalsy();

      req.flush(testResponse);
    }
  ));
});
