import {TestBed} from '@angular/core/testing';

import {ModoGuard} from './modo.guard';

describe('ModoGuard', () => {
  let guard: ModoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
