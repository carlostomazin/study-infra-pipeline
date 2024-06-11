import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlterarComponent } from './modal-alterar.component';

describe('ModalAlterarComponent', () => {
  let component: ModalAlterarComponent;
  let fixture: ComponentFixture<ModalAlterarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAlterarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
