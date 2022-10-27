import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Especialista, Paciente } from 'src/app/Clases/interfaces';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  tipo: string | null;
  formulario!: FormGroup;

  constructor(private _Activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    //private auth: AuthService
    ) {
    this.tipo = this._Activatedroute.snapshot.paramMap.get("tipo");
  }

  ngOnInit(): void {
    this.setearValidaciones();
    this.setUserCategoryValidators();
    if(this.tipo == "especialista"){
      this.opcionDelMenuOPersonalizada();
    }
  }

  setearValidaciones() {
    this.formulario = this.fb.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', Validators.required],
      'obraSocial': [""],
      'numAfiliado': [""],
      'especialidad': [""],
      'especialidadPersonalizada': [],
      'email': ['', [Validators.required, Validators.email]],
      'pass': ['', Validators.required],
      'passConfirm': ['', Validators.required],
      'check': [""]
    });
  }

  //Esta función agrega o quita validaciones según el registro sea del tipo Paciente o Especialista
  setUserCategoryValidators() {
    const obraSocialControl = this.formulario.get('obraSocial');
    const numAfiliadoControl = this.formulario.get('numAfiliado');
    const especialidadControl = this.formulario.get('especialidad');
    const especialidadPersonalizadaControl = this.formulario.get('especialidadPersonalizada');
    if (this.tipo === 'paciente') {
      obraSocialControl?.setValidators([Validators.required]);
      numAfiliadoControl?.setValidators([Validators.required]);
      especialidadControl?.setValidators(null);
      especialidadPersonalizadaControl?.setValidators(null);
    }
    if (this.tipo === 'especialista') {
      obraSocialControl?.setValidators(null);
      numAfiliadoControl?.setValidators(null);
      especialidadControl?.setValidators([Validators.required]);
      especialidadPersonalizadaControl?.setValidators([Validators.required]);
    }
    obraSocialControl?.updateValueAndValidity();
    numAfiliadoControl?.updateValueAndValidity();
    especialidadControl?.updateValueAndValidity();
    especialidadPersonalizadaControl?.updateValueAndValidity();
  }

  opcionDelMenuOPersonalizada(){
    const especialidadControl = this.formulario.get('especialidad');
    const especialidadPersonalizadaControl = this.formulario.get('especialidadPersonalizada');
    this.formulario.get('especialidadPersonalizada')?.disable();
    this.formulario.get('check')?.valueChanges
         .subscribe(value => {
            if (value) {
               // enable the input when new value is true
               this.formulario.get('especialidad')?.disable();
               this.formulario.get('especialidadPersonalizada')?.enable();
               especialidadControl?.setValidators(null);
               especialidadPersonalizadaControl?.setValidators([Validators.required]);
            } else {
               // disable the input when new value is false
               this.formulario.get('especialidad')?.enable();
               this.formulario.get('especialidadPersonalizada')?.disable();
               especialidadPersonalizadaControl?.setValidators(null);
               especialidadControl?.setValidators([Validators.required]);
            }
            especialidadControl?.updateValueAndValidity();
            especialidadPersonalizadaControl?.updateValueAndValidity();
         });
  }

  onSubmit(f: any) {
    console.log(f);
    alert("Los datos ingresados son: " + f.nombre);
    //this.router.navigate(['welcome']);
      //this.auth.SignUp(f, this.tipo);
    }

}
