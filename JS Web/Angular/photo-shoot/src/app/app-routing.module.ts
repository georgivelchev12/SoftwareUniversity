import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/authentication/edit/edit.component';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryDetailsComponent } from './components/categories/category-details/category-details.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { HomeComponent } from './components/landing/home/home.component';
import { NotFoundComponent } from './components/landing/not-found/not-found.component';
import { CreatePhotoComponent } from './components/photos/create-photo/create-photo.component';
import { DetailsPhotoComponent } from './components/photos/details-photo/details-photo.component';
import { EditPhotoComponent } from './components/photos/edit-photo/edit-photo.component';
import { ListPhotosComponent } from './components/photos/list-photos/list-photos.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Landing routes
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  // Photos routes
  { path: 'photo/create', component: CreatePhotoComponent },
  { path: 'photo/details/:id', component: DetailsPhotoComponent },
  { path: 'photo/edit/:id', component: EditPhotoComponent },
  { path: 'photo/list', component: ListPhotosComponent },

  // User routes
  { path: 'user/profile', component: EditUserComponent, canActivate: [AuthGuard]},
  // To do... create details component
  { path: 'user/details/:id', component: EditUserComponent},
  
  // Categories routes
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryCreateComponent },
  { path: 'categories/:id', component: CategoryDetailsComponent },

  // Not Found
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
