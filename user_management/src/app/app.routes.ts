import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    { 
        path: 'users', 
        title: "Usuários",
        component: UserListComponent 
    },
    { 
        path: 'add-user', 
        title: "Criar Usuário",
        component: UserFormComponent
    },
    { 
        path: 'edit-user/:id', 
        title: "Editar Usuário",
        component: UserFormComponent
    },
    { path: '', redirectTo: '/users', pathMatch: 'full' }
];