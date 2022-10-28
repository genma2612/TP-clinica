import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            console.info(user);
          }
        });
      }).catch((error) => {
        //throw new FirebaseError(error.code, error.message);
      });
  }

  // Sign up with email/password
    SignUp(objeto:any, tipo:string) {
    return this.afAuth
      .createUserWithEmailAndPassword(objeto.email, objeto.pass)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        //this.SendVerificationMail(); Sin verificación de e-mail
        this.SetUserData(result.user, objeto, tipo);
      })
      .catch((error) => {
        throw new FirebaseError(error.code, error.message);
      });
  }

  /*
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
*/

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, f:any, tipo:string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${tipo}/${user.uid}`
    );
    //let usuario:any = JSON.parse(localStorage.getItem('user')!);
    //let formObj = f.getRawValue();
    //let objeto = JSON.stringify(f)
    return userRef.set(f, {
      merge: true,
    });
  }
  // Sign out

  SignOut() {
    return this.afAuth.signOut().then(() => {
    });
  }
  
}
