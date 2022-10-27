import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuariosDePrueba = [{email:"manuel.gonzalez@sarasa.com",pass:"123456"},
  {email:"raul.gonzalez@sarasa.com",pass:"123456"},
  {email:"felipe.gonzalez@sarasa.com",pass:"123456"}];

  constructor() { }

  loguear(item:any, item2:any){

  }

  ngOnInit(): void {
  }

}
