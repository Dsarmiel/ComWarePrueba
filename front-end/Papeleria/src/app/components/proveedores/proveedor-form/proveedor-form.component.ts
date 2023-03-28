import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedorDTO } from 'src/app/dtos/proveedor.dto';
import { Proveedor } from 'src/app/models/proveedor.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.css']
})
export class ProveedorFormComponent implements OnInit {
  title: 'Crear' | 'Actualizar' = 'Crear';
  formGroup: FormGroup;
  fromControl = {
    nombreProveedor: new FormControl(null),
    direccion: new FormControl(null),
    telefono: new FormControl(null),
    email: new FormControl(null),
  };
  constructor(
    private _proveedorServices: ProveedoresService,
    private dialogRef: MatDialogRef<ProveedorFormComponent>,
    public _alertServices: AlertsService,
    @Inject(MAT_DIALOG_DATA) public dataUpdate: Proveedor
  ) {
    this.formGroup = new FormGroup(this.fromControl);
   }

  ngOnInit(): void {
    this.initComponent();
  }
  initComponent() {
    if(this.dataUpdate){
      this.isUpdate();
      this.title = 'Actualizar';
    }
  }

  createUpdateProveedor(){
    const proveedor: ProveedorDTO = {
      nombreProveedor: this.formGroup.controls['nombreProveedor'].value,
      direccion: this.formGroup.controls['direccion'].value,
      telefono: this.formGroup.controls['telefono'].value,
      email: this.formGroup.controls['email'].value
    };
    if(this.dataUpdate){
      this._proveedorServices.update(proveedor, this.dataUpdate.idProveedor).subscribe(res=>{
        this._alertServices.successAlert('Se ha actualizado el articulo con exito');
        this.dialogRef.close()
      },error=>{
        this._alertServices.errorAlert();
      });
    }else{
      this._proveedorServices.create(proveedor).subscribe(res=>{
        this._alertServices.successAlert('Se ha creado el articulo con exito');
        this.dialogRef.close()
      },error=>{
        this._alertServices.errorAlert();
      });
    }
  }
  isUpdate(){
    this.formGroup.controls['nombreProveedor'].setValue(this.dataUpdate.nombreProveedor);
    this.formGroup.controls['direccion'].setValue(this.dataUpdate.direccion)
    this.formGroup.controls['telefono'].setValue(this.dataUpdate.telefono)
    this.formGroup.controls['email'].setValue(this.dataUpdate.email)
  }
}
