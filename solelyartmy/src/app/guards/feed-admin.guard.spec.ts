import { TestBed } from '@angular/core/testing';

import { FeedAdminGuard } from './feed-admin.guard';

describe('FeedAdminGuard', () => {
  let guard: FeedAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FeedAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
