import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  formGroupFilter: FormGroup;
  fromControlFilter = {
    nombreArticulo: new FormControl(null),
    descripcion: new FormControl(null),
    precio: new FormControl(null),
    cantidad: new FormControl(null),
    categoria: new FormControl(null)
  };
  constructor() {
    this.formGroupFilter = new FormGroup(this.fromControlFilter);
  }

  ngOnInit(): void {
  }

}
