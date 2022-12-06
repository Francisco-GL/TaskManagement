import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrasesGuardadasComponent } from './frases-guardadas.component';

describe('FrasesGuardadasComponent', () => {
  let component: FrasesGuardadasComponent;
  let fixture: ComponentFixture<FrasesGuardadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrasesGuardadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrasesGuardadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
