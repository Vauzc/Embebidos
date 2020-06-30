import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NoticiasPage } from './Noticias.page';

describe('NoticiasPage', () => {
  let component: NoticiasPage;
  let fixture: ComponentFixture<NoticiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
