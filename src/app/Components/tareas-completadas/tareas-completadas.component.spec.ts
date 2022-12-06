import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasCompletadasComponent } from './tareas-completadas.component';

describe('TareasCompletadasComponent', () => {
  let component: TareasCompletadasComponent;
  let fixture: ComponentFixture<TareasCompletadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasCompletadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasCompletadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
