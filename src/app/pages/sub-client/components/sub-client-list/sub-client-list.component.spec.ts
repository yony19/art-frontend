import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClientListComponent } from './sub-client-list.component';

describe('SubClientListComponent', () => {
  let component: SubClientListComponent;
  let fixture: ComponentFixture<SubClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
