import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [{
  path: '',
  component:LayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  }, {
    path: 'to-do',
    loadChildren: () => import('./modules/to-do/to-do.module')
      .then(m => m.ToDoModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
