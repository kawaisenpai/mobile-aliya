import { TestBed } from '@angular/core/testing';

import { AutoSigninGuard } from './auto-signin.guard';

describe('AutoSigninGuard', () => {
  let guard: AutoSigninGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutoSigninGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
