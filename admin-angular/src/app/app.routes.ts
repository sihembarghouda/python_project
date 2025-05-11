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

export const routes: Routes = [
  {
    path: 'formations',
    children: [
      { path: '', component: FormationsComponent },
      { path: 'editer/:id', component: EditerFormationComponent },
    ],
  },
  {
    path: 'departements',
    children: [
      { path: '', component: DepartementsComponent },
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

  {path: 'books', component: BooksComponent},
  
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }