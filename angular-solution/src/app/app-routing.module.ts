import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableViewComponent } from './components/table-view/table-view.component';


const routes: Routes = [
  { path: '', redirectTo: 'email', pathMatch: 'full' },
  { path: 'email', component: TableViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }