import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessdienerDetailComponent } from './messdiener-detail.component';

describe('MessdienerDetailComponent', () => {
  let component: MessdienerDetailComponent;
  let fixture: ComponentFixture<MessdienerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessdienerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessdienerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
