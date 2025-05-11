import { EtudiantService } from './../../../services/etudiant.service';
import { Component, inject } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajouter-etudiant',
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './ajouter-etudiant.component.html',
  styleUrl: './ajouter-etudiant.component.css',
})
export class AjouterEtudiantComponent {
  constructor(
    private etudiantService: EtudiantService,
    private router: Router
  ) {}

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    id: this.fb.control(null, [Validators.required]),
    nom: this.fb.control('', [Validators.required]),
    prenom: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required]),
    telephone: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.etudiantService
        .ajouterEtudiant(this.validateForm.value)
        .subscribe((res) => {
          this.router.navigate(['/etudiants']);
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
