import { TestBed } from '@angular/core/testing';

import { QuestionGameInstanceService } from './question-game--instance.service';

describe('QuestionGameInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionGameInstanceService = TestBed.get(QuestionGameInstanceService);
    expect(service).toBeTruthy();
  });
});
