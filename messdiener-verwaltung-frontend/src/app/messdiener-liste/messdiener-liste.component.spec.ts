import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessdienerListeComponent } from './messdiener-liste.component';

describe('MessdienerListeComponent', () => {
  let component: MessdienerListeComponent;
  let fixture: ComponentFixture<MessdienerListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessdienerListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessdienerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
