import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';

const routes: Routes = [
  { path: '', redirectTo: '/articulos', pathMatch: 'full' },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: 'categoria', component: CategoriasComponent },
  { path: 'proveedor', component: ProveedoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
