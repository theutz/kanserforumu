import { TestBed, inject } from '@angular/core/testing';

import { DiscussionsService } from './discussions.service';

describe('DiscussionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscussionsService]
    });
  });

  it('should ...', inject([DiscussionsService], (service: DiscussionsService) => {
    expect(service).toBeTruthy();
  }));
});
