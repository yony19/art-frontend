import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClientCreateComponent } from './sub-client-create.component';

describe('SubClientCreateComponent', () => {
  let component: SubClientCreateComponent;
  let fixture: ComponentFixture<SubClientCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubClientCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
