import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  displayedColumns: string[] = ['idCategoria', 'nombreCategoria', 'actions'];
  categoriaList: Array<Categoria> = [];
  constructor(
    private _categoriasService: CategoriasService,
    public _dialog: MatDialog,
    public _alertServices: AlertsService
  ) {}
  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.getAllCategorias();
  }
  openModalCreate() {
    this._dialog
      .open(CategoriaFormComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllCategorias();
      });
  }
  openModalUpdate(categoria: Categoria) {
    this._dialog
      .open(CategoriaFormComponent, {
        data: categoria,
        width: '450px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllCategorias();
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
}
