import { TestBed } from '@angular/core/testing';

import { FrasesService } from './frases.service';

describe('FrasesService', () => {
  let service: FrasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
