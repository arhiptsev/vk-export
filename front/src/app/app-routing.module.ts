import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './core/mainpage/mainpage.component';
import { ExportComponent } from './export/export.component';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MainpageComponent
  },
  {
    path: 'export',
    component: ExportComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
