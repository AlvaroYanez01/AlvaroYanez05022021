import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './components/factura/factura.component';
import { VerdetalleComponent } from './components/verdetalle/verdetalle.component';

const routes: Routes = [
  { path: 'factura', component: FacturaComponent },
  { path: 'verdetalle', component: VerdetalleComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'factura' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
