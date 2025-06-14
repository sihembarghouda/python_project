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
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editer-etudiant',
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './editer-etudiant.component.html',
  styleUrl: './editer-etudiant.component.css',
})
export class EditerEtudiantComponent {
  constructor(
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.etudiantService.getEtudiant(id).subscribe((data) => {
      this.etudiant = data;
      this.validateForm.patchValue({
        nom: this.etudiant.nom,
        prenom: this.etudiant.prenom,
        email: this.etudiant.email,
        telephone: this.etudiant.telephone,
      });
    });
  }
  private fb = inject(NonNullableFormBuilder);
  etudiant: any;

  validateForm = this.fb.group({
    nom: this.fb.control('', [Validators.required]),
    prenom: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required]),
    telephone: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.etudiantService
        .updateEtudiant(this.etudiant.id, this.validateForm.value)
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
