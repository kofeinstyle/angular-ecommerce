import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import  * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) {
    firebase.auth().getRedirectResult().then(function(result) {

    });
    /*firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        console.log(result.credential);
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });*/
  }

  login() {
    this.auth.login();
  }
}
