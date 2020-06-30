import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GruposEInicioPage } from './grupos-e-inicio.page';

describe('GruposEInicioPage', () => {
  let component: GruposEInicioPage;
  let fixture: ComponentFixture<GruposEInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposEInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GruposEInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
