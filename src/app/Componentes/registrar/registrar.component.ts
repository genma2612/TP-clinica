import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Especialista, Paciente } from 'src/app/Clases/interfaces';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Servicios/auth.service';

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
    private auth: AuthService
  ) {
    this.tipo = this._Activatedroute.snapshot.paramMap.get("tipo");
  }

  ngOnInit(): void {
    this.setearValidaciones();
    this.setUserCategoryValidators();
  }

  setearValidaciones() {
    this.formulario = this.fb.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      'obraSocial': ["", Validators.required],
      'numAfiliado': ["", [Validators.required, Validators.min(1000), Validators.max(9999)]],
      'especialidad': ["", Validators.required],
      'especialidadPersonalizada': ["", Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'pass': ['', Validators.required],
      'passConfirm': ['', Validators.required]
    });
  }

  //Esta función agrega o quita validaciones según el registro sea del tipo Paciente o Especialista
  setUserCategoryValidators() {
    const obraSocialControl = this.formulario.get('obraSocial');
    const numAfiliadoControl = this.formulario.get('numAfiliado');
    const especialidadControl = this.formulario.get('especialidad');
    const especialidadPersonalizadaControl = this.formulario.get('especialidadPersonalizada');
    especialidadPersonalizadaControl?.disable(); // Siempre la deshabilito por defecto, sea paciente o especialista
    especialidadPersonalizadaControl?.updateValueAndValidity();
    if (this.tipo === 'paciente') { //Si es paciente, deshabilito los campos del especialista.
      especialidadControl?.disable();
      especialidadControl?.updateValueAndValidity();
    }
    if (this.tipo === 'especialista') { //Si es especialista, deshabilito los campos del paciente.
      obraSocialControl?.disable();
      obraSocialControl?.updateValueAndValidity();
      numAfiliadoControl?.disable();
      numAfiliadoControl?.updateValueAndValidity();
    }
  }

  agregarOpcionPersonal() {
    const especialidadControl = this.formulario.get('especialidad');
    const especialidadPersonalizadaControl = this.formulario.get('especialidadPersonalizada');
    if (especialidadControl?.enabled) {
      especialidadControl?.disable()
      especialidadPersonalizadaControl?.enable();
    }
    else {
      especialidadControl?.enable();
      especialidadPersonalizadaControl?.disable();
    }
    especialidadControl?.updateValueAndValidity();
    especialidadPersonalizadaControl?.updateValueAndValidity();
  }

  /* Opcion de arriba no utiliza observable
  opcionDelMenuOPersonalizada() {
    const especialidadControl = this.formulario.get('especialidad');
    const especialidadPersonalizadaControl = this.formulario.get('especialidadPersonalizada');
    especialidadPersonalizadaControl?.disable();
    this.formulario.get('check')?.valueChanges
      .subscribe(value => {
        if (value) {
          // enable the input when new value is true
          especialidadControl?.disable();
          especialidadPersonalizadaControl?.enable();
        } else {
          // disable the input when new value is false
          especialidadControl?.enable();
          especialidadPersonalizadaControl?.disable();
        }
        especialidadControl?.updateValueAndValidity();
        especialidadPersonalizadaControl?.updateValueAndValidity();
      });
  }*/

  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }

  // getting the form control elements
  get password(): AbstractControl {
    return this.formulario.controls['pass'];
  }

  get confirm_password(): AbstractControl {
    return this.formulario.controls['passConfirm'];
  }





  onSubmit(f: any) {
    this.crearUsuario(f, this.tipo!);
    //this.router.navigate(['welcome']);
  }

  crearUsuario(form: any, tipo: string) {
    console.log(form);
    if (tipo == 'especialista') {
      if (form.especialidad == undefined) {
        form.especialidad = form.especialidadPersonalizada;
        delete form['especialidadPersonalizada']
      }
    }
    delete form['passConfirm'];
    //let teset: Especialista = form; // Tipificar objeto segun interfaces
    this.auth.SignUp(form, tipo)

  }

}
