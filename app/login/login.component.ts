import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
constructor(private router: Router){}
login():void {
  if(this.username=='Deva'&& this.password=='2653'){
    alert("Login Successfully");
    this.router.navigate(['dashboard']);
  }else{
    alert("Login failed");
  }
}


}
