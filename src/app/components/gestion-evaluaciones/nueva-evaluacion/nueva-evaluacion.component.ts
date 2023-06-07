import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaModuloEvaluacionInterface } from 'src/app/models/moduloEvaluacion';
import { ListaPreguntasByEvaluacionInterface } from 'src/app/models/preguntasByEvaluacion';
import { ListaTipoEvaluacionInterface } from 'src/app/models/tipoEvaluacion';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-nueva-evaluacion',
  templateUrl: './nueva-evaluacion.component.html',
  styleUrls: ['./nueva-evaluacion.component.css']
})
export class NuevaEvaluacionComponent implements OnInit {
  preguntasEvaluacion: ListaPreguntasByEvaluacionInterface;
  modulos: ListaModuloEvaluacionInterface[];
  tipoEvaluacion: ListaTipoEvaluacionInterface[];
  preguntaCount = 2;
  
  constructor(private api:ApiService, private router: Router){}

  
  registroForm= new FormGroup({
    pregunta: new FormControl(''),
    moduloSeleccionado: new FormControl(''),
    tipoSeleccionado: new FormControl('')
  })

  // moduloSeleccionado: number = 0;
  // tipoSeleccionado: number = 0;
  submitForm() {
    console.log(this.registroForm.value.moduloSeleccionado);
    console.log(this.registroForm.value.tipoSeleccionado);
    console.log(this.registroForm.value.pregunta);


  }


  ngOnInit(): void {
    this.api.getAllModulos().subscribe(data =>{
      console.log(data)
      this.modulos = data; 
    })

    this.api.getAllTipoEvaluacion().subscribe(data =>{
      console.log(data)
      this.tipoEvaluacion = data; 
    })

  }

 

  AddCompetencia(){
    
  }

  AddQuestion(){
    if (this.preguntaCount <= 30) {
      const nuevaPregunta: any = document.getElementById('preguntas');
      let input = document.createElement("input");
      input.setAttribute("class", "form-control");
      input.setAttribute("maxlength", "250");
      input.setAttribute("id", `Pregunta ${this.preguntaCount}`);
      input.required = true;
      
      let label = document.createElement("label");
      label.style.fontWeight = 'bold';
      label.textContent  = `Pregunta ${this.preguntaCount}:`;
      this.preguntaCount++;
      nuevaPregunta.appendChild(label);
      nuevaPregunta.appendChild(input);
    }

  }

}