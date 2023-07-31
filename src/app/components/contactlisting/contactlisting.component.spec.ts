import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactlistingComponent } from './contactlisting.component';

describe('ContactlistingComponent', () => {
  let component: ContactlistingComponent;
  let fixture: ComponentFixture<ContactlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactlistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
