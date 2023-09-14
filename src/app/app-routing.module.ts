import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AllTodosComponent } from './components/all-todos/all-todos.component';
import { authGuard } from './auth/auth.guard';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: AllTodosComponent, canActivate: [authGuard],
    children: [
      { path: ':id', component: TodoDetailsComponent, canActivate: [authGuard] },
      { path: 'add', component: AddTodoComponent, canActivate: [authGuard] }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
