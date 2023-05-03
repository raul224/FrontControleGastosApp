import { TestBed } from '@angular/core/testing';

import { AutenticationService } from './autentication.service';

describe('LoginService', () => {
  let service: AutenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
