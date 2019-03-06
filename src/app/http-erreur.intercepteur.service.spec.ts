import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptor } from './http-erreur.intercepteur.service';

describe('HttpErreur.IntercepteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpErrorInterceptor = TestBed.get(HttpErrorInterceptor);
    expect(service).toBeTruthy();
  });
});
