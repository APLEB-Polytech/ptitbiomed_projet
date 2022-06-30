import {TestBed} from '@angular/core/testing';

import {ListeUtilisateurService} from './liste-utilisateur.service';

describe('ListeUtilisateurService', () => {
  let service: ListeUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
