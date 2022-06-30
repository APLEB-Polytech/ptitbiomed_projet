import {Component, OnInit} from '@angular/core';
import {ListeUtilisateurService} from "./liste-utilisateur.service";

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.css']
})
export class ListeUtilisateursComponent implements OnInit {

  constructor(private utilisateurService: ListeUtilisateurService) {
  }

  ngOnInit(): void {
  }

}
