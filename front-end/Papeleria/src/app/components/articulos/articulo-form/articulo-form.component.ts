import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticuloDTO } from 'src/app/dtos/articulo.dto';
import { Articulo } from 'src/app/models/articulo.model';
import { Categoria } from 'src/app/models/categoria.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css'],
})
export class ArticuloFormComponent implements OnInit {
  title: 'Crear' | 'Actualizar' = 'Crear';
  formGroup: FormGroup;
  categoriaList: Array<Categoria> = [];
  fromControl = {
    nombreArticulo: new FormControl(null),
    descripcion: new FormControl(null),
    precio: new FormControl(null),
    cantidad: new FormControl(null),
    categoria: new FormControl(null),
  };
  constructor(
    private _articulosService: ArticulosService,
    private _categoriasService: CategoriasService,
    private dialogRef: MatDialogRef<ArticuloFormComponent>,
    public _alertServices: AlertsService,
    @Inject(MAT_DIALOG_DATA) public dataUpdate: Articulo
  ) {
    this.formGroup = new FormGroup(this.fromControl);
  }

  ngOnInit(): void {
    this.initComponent();
  }
  initComponent() {
    this.getAllCategorias();
    if(this.dataUpdate){
      this.isUpdate();
      this.title = 'Actualizar';
    }
  }
  createUpdateArticulo(){
    const articulo: ArticuloDTO = {
      nombre: this.formGroup.controls['nombreArticulo'].value,
      descripcion: this.formGroup.controls['descripcion'].value,
      precio: this.formGroup.controls['precio'].value,
      cantidad: this.formGroup.controls['cantidad'].value,
      categoria: this.formGroup.controls['categoria'].value,
    };
    if(this.dataUpdate){
      this._articulosService.update(articulo, this.dataUpdate.id_articulo).subscribe(res=>{
        this._alertServices.successAlert('Se ha actualizado el articulo con exito');
        this.dialogRef.close()
      },error=>{
        this._alertServices.errorAlert();
      });
    }else{
      this._articulosService.create(articulo).subscribe(res=>{
        this._alertServices.successAlert('Se ha creado el articulo con exito');
        this.dialogRef.close()
      },error=>{
        this._alertServices.errorAlert();
      });
    }
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
  isUpdate(){
    this.formGroup.controls['nombreArticulo'].setValue(this.dataUpdate.nombre_articulo);
    this.formGroup.controls['descripcion'].setValue(this.dataUpdate.descripcion)
    this.formGroup.controls['precio'].setValue(this.dataUpdate.precio)
    this.formGroup.controls['cantidad'].setValue(this.dataUpdate.cantidad_disponible)
    this.formGroup.controls['categoria'].setValue(this.dataUpdate.id_categoria)
  }
}
