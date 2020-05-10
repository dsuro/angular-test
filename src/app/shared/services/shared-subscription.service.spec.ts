import { TestBed, inject } from '@angular/core/testing';

import { SharedSubscriptionService } from './shared-subscription.service';

describe('SharedSubscriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedSubscriptionService]
    });
  });

  it('should be created', inject([SharedSubscriptionService], (service: SharedSubscriptionService) => {
    expect(service).toBeTruthy();
  }));
});
