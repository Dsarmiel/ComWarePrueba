import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaDTO } from 'src/app/dtos/categoria.dto';
import { Categoria } from 'src/app/models/categoria.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css'],
})
export class CategoriaFormComponent implements OnInit {
  title: 'Crear' | 'Actualizar' = 'Crear';
  nombreCategoria: string = "";
  constructor(
  @Inject(MAT_DIALOG_DATA) public dataUpdate: Categoria,
  private __categoriasService: CategoriasService,
  private _alertServices: AlertsService,
  private dialogRef: MatDialogRef<CategoriaFormComponent>,
  ) {}

  ngOnInit(): void {
    this.initComponent();
  }
  initComponent() {
    if (this.dataUpdate) {
      this.title = 'Actualizar';
      this.nombreCategoria = this.dataUpdate.nombreCategoria;
    }
  }
  creeateUpdateCategoria(){
    const categoriaDTO: CategoriaDTO = {
      nombreCategoria: this.nombreCategoria
    }
    if (this.dataUpdate) {
      this.__categoriasService.update(categoriaDTO, this.dataUpdate.idCategoria).subscribe(res=>{
        this._alertServices.successAlert('Se ha actualizado la categoria con exito');
        this.dialogRef.close()
      },error=>{
        this._alertServices.errorAlert();
      });
    }else{
      this.__categoriasService.create(categoriaDTO).subscribe(res=>{
        this._alertServices.successAlert('Se ha creado la categoria con exito');
        this.dialogRef.close()
      },error=>{
        this._alertServices.errorAlert();
      });
    }
  }
}
