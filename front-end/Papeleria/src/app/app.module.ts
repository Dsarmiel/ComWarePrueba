import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaFormComponent } from './components/categorias/categoria-form/categoria-form.component';
import { ArticuloFormComponent } from './components/articulos/articulo-form/articulo-form.component';
import { ProveedorFormComponent } from './components/proveedores/proveedor-form/proveedor-form.component';
import { FacturaFormComponent } from './components/facturas/factura-form/factura-form.component';
import { FacturaUpdateComponent } from './components/facturas/factura-update/factura-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    ProveedoresComponent,
    CategoriasComponent,
    FacturasComponent,
    CategoriaFormComponent,
    ArticuloFormComponent,
    ProveedorFormComponent,
    FacturaFormComponent,
    FacturaUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
