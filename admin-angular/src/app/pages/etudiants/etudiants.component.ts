import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterLink } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

@Component({
  selector: 'app-etudiants',
  imports: [NzTableModule, NzDividerModule, RouterLink, NzButtonModule],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css',
})
export class EtudiantsComponent {
  etudiants: Etudiant[] = [];

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.etudiantService.getEtudiants().subscribe((data: Etudiant[]) => {
      this.etudiants = data;
    });
  }

  deleteEtudiant(id: any) {
    this.etudiantService.deleteEtudiant(id).subscribe(() => {
      this.loadData();
    });
  }
}
