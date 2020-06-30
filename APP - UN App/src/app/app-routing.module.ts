import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'AboutTheApp',
    loadChildren: () => import('./AboutTheApp/AboutTheApp.module').then( m => m.AboutTheAppPageModule)
  },
  {
    path: 'Tutorias',
    loadChildren: () => import('./Tutorias/Tutorias.module').then( m => m.TutoriasPageModule)
  },
  {
    path: 'Grupos',
    loadChildren: () => import('./Grupos/Grupos.module').then( m => m.GruposPageModule)
  },
  {
    path: 'GruposE',
    loadChildren: () => import('./GruposE/GruposE.module').then( m => m.GruposEPageModule)
  },
  {
    path: 'GruposU',
    loadChildren: () => import('./GruposU/GruposU.module').then( m => m.GruposUPageModule)
  },
  {
    path: 'Noticias',
    loadChildren: () => import('./Noticias/Noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'Convocatorias',
    loadChildren: () => import('./Convocatorias/Convocatorias.module').then( m => m.ConvocatoriasPageModule)
  },
  {
    path: 'Becas',
    loadChildren: () => import('./Becas/Becas.module').then( m => m.BecasPageModule)
  },
  {
    path: 'Maestrias',
    loadChildren: () => import('./Maestrias/Maestrias.module').then( m => m.MaestriasPageModule)
  },
  {
    path: 'Pasantias',
    loadChildren: () => import('./Pasantias/Pasantias.module').then( m => m.PasantiasPageModule)
  },
  {
    path: 'Laboral',
    loadChildren: () => import('./Laboral/Laboral.module').then( m => m.LaboralPageModule)
  },
  {  
    path: 'Disponibilidad',
    loadChildren: () => import('./Disponibilidad/Disponibilidad.module').then( m => m.DisponibilidadPageModule)
  }, 
  {
    path: 'NewGrupoEstudio',
    loadChildren: () => import('./NewGrupoEstudio/NewGrupoEstudio.module').then( m => m.NewGrupoEstudioPageModule)
  },
  {
    path: 'ReservasHechas',
    loadChildren: () => import('./ReservasHechas/ReservasHechas.module').then( m => m.ReservasHechasPageModule)
  },
  {
    path: 'tab1',
    redirectTo: '/tabs/tab1'
  },
  {
    path: 'tab2',
    redirectTo: '/tabs/tab2' 
  },
  {
    path: 'tabReservaMesas',
    redirectTo: '/tabs/tabReservaMesas' 
  },
  {
    path: 'grupos-e-inicio',
    loadChildren: () => import('./grupos-e-inicio/grupos-e-inicio.module').then( m => m.GruposEInicioPageModule)
  },
  {
    path: 'g-acad',
    loadChildren: () => import('./g-acad/g-acad.module').then( m => m.GAcadPageModule)
  },
  {
    path: 'g-dep',
    loadChildren: () => import('./g-dep/g-dep.module').then( m => m.GDepPageModule)
  },
  {
    path: 'g-otros',
    loadChildren: () => import('./g-otros/g-otros.module').then( m => m.GOtrosPageModule)
  },
  {
    path: 'g-gai',
    loadChildren: () => import('./g-gai/g-gai.module').then( m => m.GGaiPageModule)
  },
  {
    path: 'gea-hechos',
    loadChildren: () => import('./gea-hechos/gea-hechos.module').then( m => m.GeaHechosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'actualizar',
    loadChildren: () => import('./actualizar/actualizar.module').then( m => m.ActualizarPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
