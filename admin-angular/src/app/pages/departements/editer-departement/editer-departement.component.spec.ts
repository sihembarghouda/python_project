import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerDepartementComponent } from './editer-departement.component';

describe('EditerDepartementComponent', () => {
  let component: EditerDepartementComponent;
  let fixture: ComponentFixture<EditerDepartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditerDepartementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditerDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
