import { TestBed } from '@angular/core/testing';

import { AuthYoutubeService } from './auth-youtube.service';

describe('AuthYoutubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthYoutubeService = TestBed.get(AuthYoutubeService);
    expect(service).toBeTruthy();
  });
});
