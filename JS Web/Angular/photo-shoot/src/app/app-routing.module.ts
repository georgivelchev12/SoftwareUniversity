import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard]
  // },
  // { path: 'register', component: LoginRegisterTemplateComponent },

  // { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
