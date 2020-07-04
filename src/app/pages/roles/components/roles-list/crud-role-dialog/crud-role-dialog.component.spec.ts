import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRoleDialogComponent } from './crud-role-dialog.component';

describe('CrudRoleDialogComponent', () => {
  let component: CrudRoleDialogComponent;
  let fixture: ComponentFixture<CrudRoleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudRoleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
