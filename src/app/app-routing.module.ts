import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './componenets/table/table.component';
import { UserFormComponent } from './dialogs/user-form/user-form.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/userList', pathMatch: 'full' },
  { path: 'userList', component: TableComponent },
  // { path: 'userlist/newUser', component: UserFormComponent },

  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
