import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasantiasPage } from './Pasantias.page';

describe('PasantiasPage', () => {
  let component: PasantiasPage;
  let fixture: ComponentFixture<PasantiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasantiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasantiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
