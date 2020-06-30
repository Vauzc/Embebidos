import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewGrupoEstudioPage } from './NewGrupoEstudio.page';

describe('NewGrupoEstudioPage', () => {
  let component: NewGrupoEstudioPage;
  let fixture: ComponentFixture<NewGrupoEstudioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGrupoEstudioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewGrupoEstudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
