import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeaHechosPage } from './gea-hechos.page';

describe('GeaHechosPage', () => {
  let component: GeaHechosPage;
  let fixture: ComponentFixture<GeaHechosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeaHechosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeaHechosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
