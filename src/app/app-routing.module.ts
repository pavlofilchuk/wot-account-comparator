import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserInfoResolve } from './resolvers/user-info.resolve';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { 
    path: ':id', 
    component: UserInfoComponent,
    resolve: { user: UserInfoResolve },
  },
  {
    path: '',
    component: SearchComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}