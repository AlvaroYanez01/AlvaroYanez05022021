import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './components/factura/factura.component';

const routes: Routes = [
  { path: 'factura', component: FacturaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'factura' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
