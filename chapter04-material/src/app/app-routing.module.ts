import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { BasicComponent } from './page/basic/basic.component';
import { PaginatorComponent } from './page/paginator/paginator.component';
import { FilterComponent } from './page/filter/filter.component';
import { EditableComponent } from './page/editable/editable.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'basic',
    component: BasicComponent,
  },
  {
    path: 'paginator',
    component: PaginatorComponent,
  },
  {
    path: 'filter',
    component: FilterComponent,
  },
  {
    path: 'editable',
    component: EditableComponent,
  },
  {
    path: 'editable/edit/:id',
    component: UserEditorComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
