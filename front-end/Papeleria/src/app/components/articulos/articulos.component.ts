import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloDTO } from 'src/app/dtos/articulo.dto';
import { Articulo } from 'src/app/models/articulo.model';
import { Categoria } from 'src/app/models/categoria.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ArticuloFormComponent } from './articulo-form/articulo-form.component';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
})
export class ArticulosComponent implements OnInit {
  formGroupFilter: FormGroup;
  categoriaList: Array<Categoria> = [];
  articulosList: Array<Articulo> = [];
  displayedColumns: Array<string> = ['nombre', 'descripcion', 'precio', 'cantidad', 'categoria', 'actions']
  fromControlFilter = {
    nombreArticulo: new FormControl(null),
    descripcion: new FormControl(null),
    precio: new FormControl(null),
    cantidad: new FormControl(null),
    categoria: new FormControl(null),
  };
  constructor(
    private _articulosService: ArticulosService,
    private _categoriasService: CategoriasService,
    public _dialog: MatDialog,
    public _alertServices: AlertsService
  ) {
    this.formGroupFilter = new FormGroup(this.fromControlFilter);
  }

  ngOnInit(): void {
    this.initComponent();

  }
  initComponent() {
    this.getAllCategorias();
    this.getAllArticulos();
  }
  openModalCreate() {
    this._dialog
    .open(ArticuloFormComponent, {
      width: '450px',
    })
    .afterClosed()
    .subscribe(() => {
      this.getAllArticulos();
    });
  }
  openModalUpdate(articulo: Articulo) {
    this._dialog
      .open(ArticuloFormComponent, {
        data: articulo,
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllArticulos();
      });
  }
  getAllCategorias() {
    this._categoriasService.getAll().subscribe(
      (res) => {
        this.categoriaList = res;
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
  getAllArticulos() {
    this._articulosService.getAll().subscribe(
      (res) => {
        this.articulosList = res;
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
  getFilter() {
    const filter: ArticuloDTO = {
      nombre: this.formGroupFilter.controls['nombreArticulo'].value,
      descripcion: this.formGroupFilter.controls['descripcion'].value,
      precio: this.formGroupFilter.controls['precio'].value,
      cantidad: this.formGroupFilter.controls['cantidad'].value,
      categoria: this.formGroupFilter.controls['categoria'].value,
    };
    this._articulosService.getByFilter(filter).subscribe(
      (res) => {
        this.articulosList = res;
      },
      (error) => {
        this._alertServices.errorAlert();
      }
    );
  }
  getCategoria(id: number): string{
    let categoriaName: string | undefined = "";
    if(id){
      categoriaName = this.categoriaList.find(categoria=> categoria.idCategoria === id)?.nombreCategoria
    }else{
      categoriaName = "Categoria no asignada"
    }
    return categoriaName as string;
  }
}
