import { TestBed, inject } from '@angular/core/testing';

import { DiscussionResolverService } from './discussion-resolver.service';

describe('DiscussionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscussionResolverService]
    });
  });

  it('should ...', inject([DiscussionResolverService], (service: DiscussionResolverService) => {
    expect(service).toBeTruthy();
  }));
});
