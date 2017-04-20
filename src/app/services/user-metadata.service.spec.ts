import { TestBed, inject } from '@angular/core/testing';

import { UserMetadataService } from './user-metadata.service';

describe('UserMetadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserMetadataService]
    });
  });

  it('should ...', inject([UserMetadataService], (service: UserMetadataService) => {
    expect(service).toBeTruthy();
  }));
});
