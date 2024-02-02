import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should make a GET request', () => {
    const testData = { /* Define test data here */ };
    const endpoint = 'test';
    service.get(endpoint).subscribe(data => {
      expect(data).toEqual(testData); // Assert that the data matches the expected test data
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${endpoint}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData); // Simulate a successful response
  });

  it('should make a POST request', () => {
    const testData = { /* Define test data here */ };
    const endpoint = 'test';
    const postData = { /* Define test post data here */ };
    service.post(endpoint, postData).subscribe(data => {
      expect(data).toEqual(testData); // Assert that the data matches the expected test data
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${endpoint}`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData); // Simulate a successful response
  });
});
