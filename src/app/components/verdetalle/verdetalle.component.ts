import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-verdetalle',
  templateUrl: './verdetalle.component.html',
  styleUrls: ['./verdetalle.component.css']
})
export class VerdetalleComponent implements OnInit {
  forma: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }


   //Crear formulario
   crearFormulario(){
    this.forma = this.fb.group({
      cedula: [''],
      nombres: [''],
      apellidos: ['']
    });

  }

}
