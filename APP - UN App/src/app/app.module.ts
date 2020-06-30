import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PerfilPageModule } from './perfil/perfil.module';
import { AboutTheAppPageModule } from './AboutTheApp/AboutTheApp.module';
import { TutoriasPageModule } from './Tutorias/Tutorias.module';
import { GruposPageModule } from './Grupos/Grupos.module';
import { GruposEPageModule } from './GruposE/GruposE.module';
import { GruposUPageModule } from './GruposU/GruposU.module';
import { NoticiasPageModule } from './Noticias/Noticias.module';
import { ConvocatoriasPageModule } from './Convocatorias/Convocatorias.module';
import { BecasPageModule } from './Becas/Becas.module';
import { MaestriasPageModule } from './Maestrias/Maestrias.module';
import { PasantiasPageModule } from './Pasantias/Pasantias.module';
import { LaboralPageModule } from './Laboral/Laboral.module';
import { ReservasHechasPageModule } from './ReservasHechas/ReservasHechas.module'; 
import { DisponibilidadPageModule } from './Disponibilidad/Disponibilidad.module'; 
import { NewGrupoEstudioPageModule } from './NewGrupoEstudio/NewGrupoEstudio.module';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import {IMqttMessage,MqttModule,IMqttServiceOptions} from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPageModule } from './login/login.module'; 
import { PopoverPageModule } from './popover/popover.module';


export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'aulal.org',
  port: 9001,
  username: 'mqtt',
  password: 'mqtt'
};

export const USERDATA: {usuario: String}={usuario:'Diego'};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    PerfilPageModule, 
    AboutTheAppPageModule,
    TutoriasPageModule,
    GruposPageModule, 
    GruposEPageModule, 
    GruposUPageModule,
    NoticiasPageModule,
    ConvocatoriasPageModule,
    BecasPageModule,
    MaestriasPageModule,
    PasantiasPageModule,
    LaboralPageModule,
    DisponibilidadPageModule,
    NewGrupoEstudioPageModule,
    ReservasHechasPageModule,
    LoginPageModule, 
    PopoverPageModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ], 
  providers: [ 
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AppAvailability,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
