import { Routes } from '@angular/router';
import { FormationsComponent } from './pages/formations/formations.component';
import { DepartementsComponent } from './pages/departements/departements.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EtudiantsComponent } from './pages/etudiants/etudiants.component';
import { EditerEtudiantComponent } from './pages/etudiants/editer-etudiant/editer-etudiant.component';
import { EditerDepartementComponent } from './pages/departements/editer-departement/editer-departement.component';
import { EditerFormationComponent } from './pages/formations/editer-formation/editer-formation.component';
import { BooksComponent } from './pages/books/books.component';
import { AboutComponent } from './pages/about/about.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AjouterDepartementComponent } from './pages/departements/ajouter-departement/ajouter-departement.component';
import { AjouterFormationComponent } from './pages/formations/ajouter-formation/ajouter-formation.component';

export const routes: Routes = [
  {
    path: 'formations',
    children: [
      { path: '', component: FormationsComponent },
      { path: 'ajouter', component: AjouterFormationComponent },
      { path: 'editer/:id', component: EditerFormationComponent },
    ],
  },
  {
    path: 'departements',
    children: [
      { path: '', component: DepartementsComponent },
      { path: 'ajouter', component: AjouterDepartementComponent },
      { path: 'editer/:id', component: EditerDepartementComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'etudiants',
    children: [
      { path: '', component: EtudiantsComponent },
      { path: 'editer/:id', component: EditerEtudiantComponent },
    ],
  },
  { path: 'books', component: BooksComponent },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
