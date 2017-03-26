import { TestBed, inject } from '@angular/core/testing';

import { TranslationConfigService } from './translation-config.service';

describe('TranslationConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationConfigService]
    });
  });

  it('should ...', inject([TranslationConfigService], (service: TranslationConfigService) => {
    expect(service).toBeTruthy();
  }));
});
