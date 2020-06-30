import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaboralPage } from './Laboral.page';

describe('LaboralPage', () => {
  let component: LaboralPage;
  let fixture: ComponentFixture<LaboralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaboralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
