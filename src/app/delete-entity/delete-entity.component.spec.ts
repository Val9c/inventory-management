import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEntityComponent } from './delete-entity.component';

describe('DeleteEntityComponent', () => {
  let component: DeleteEntityComponent;
  let fixture: ComponentFixture<DeleteEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteEntityComponent]
    });
    fixture = TestBed.createComponent(DeleteEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
