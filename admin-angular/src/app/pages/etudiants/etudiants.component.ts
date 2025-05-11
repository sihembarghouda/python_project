import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterLink } from '@angular/router';

interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

@Component({
  selector: 'app-etudiants',
  imports: [NzTableModule, NzDividerModule, RouterLink],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css',
})
export class EtudiantsComponent {
  listOfData: Etudiant[] = [
    {
      id: '20250001',
      nom: 'BARGHOUDA',
      prenom: 'Syhem',
      email: 'syhem@gmail.com',
      telephone: '98123456',
    },
    {
      id: '20250001',
      nom: 'BARGHOUDA',
      prenom: 'Syhem',
      email: 'syhem@gmail.com',
      telephone: '98123456',
    },
    {
      id: '20250001',
      nom: 'BARGHOUDA',
      prenom: 'Syhem',
      email: 'syhem@gmail.com',
      telephone: '98123456',
    },
  ];
}
