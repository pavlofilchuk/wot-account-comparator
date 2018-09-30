import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserInfoResolve } from './resolvers/user-info.resolve';
import { SearchComponent } from './components/search/search.component';
import { CompareComponent } from './components/compare/compare.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    pathMatch: 'full',
  },
  { 
    path: 'user/:id', 
    component: UserInfoComponent,
    resolve: { user: UserInfoResolve },
  },
  {
    path: 'compare',
    component: CompareComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}