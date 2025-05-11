import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerEtudiantComponent } from './editer-etudiant.component';

describe('EditerEtudiantComponent', () => {
  let component: EditerEtudiantComponent;
  let fixture: ComponentFixture<EditerEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditerEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditerEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
