import { Routes } from '@angular/router';
import { DeputadoDetailsComponent } from './pages/deputado-details/deputado-details.component';
import { DeputadosListComponent } from './pages/deputados-list/deputados-list.component';

export const routes: Routes = [
    {
        path: 'deputados',
        title: "Deputados",
        component: DeputadosListComponent
    },
    {
        path: 'detalhes/:id',
        title: "Ficha do deputado",
        component: DeputadoDetailsComponent
    },
    { path: '', redirectTo: '/deputados', pathMatch: 'full' }
];