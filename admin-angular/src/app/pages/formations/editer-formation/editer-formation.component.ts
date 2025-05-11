import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-editer-formation',
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './editer-formation.component.html',
  styleUrl: './editer-formation.component.css',
})
export class EditerFormationComponent {
  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    nom: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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
