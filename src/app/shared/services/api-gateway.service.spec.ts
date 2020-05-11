import { TestBed, inject } from '@angular/core/testing';

import { ApiGatewayService } from './api-gateway.service';

xdescribe('ApiGatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGatewayService]
    });
  });

  it('should be created', inject([ApiGatewayService], (service: ApiGatewayService) => {
    expect(service).toBeTruthy();
  }));
});
