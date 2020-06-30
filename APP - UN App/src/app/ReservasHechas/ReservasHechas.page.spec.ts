import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservasHechasPage } from './ReservasHechas.page';

describe('ReservasHechasPage', () => {
  let component: ReservasHechasPage;
  let fixture: ComponentFixture<ReservasHechasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasHechasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasHechasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
