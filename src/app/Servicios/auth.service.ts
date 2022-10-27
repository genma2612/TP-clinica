// import { Injectable, NgZone } from '@angular/core';
// import * as auth from 'firebase/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { BehaviorSubject, Observable } from 'rxjs';
// import {
//   AngularFirestore,
//   AngularFirestoreDocument,
// } from '@angular/fire/compat/firestore';
// import { Router } from '@angular/router';
// import { FirebaseError } from 'firebase/app';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   userData: any; // Save logged in user data
//   constructor(
//     public afs: AngularFirestore, // Inject Firestore service
//     public afAuth: AngularFireAuth, // Inject Firebase auth service
//     public router: Router,
//     public ngZone: NgZone // NgZone service to remove outside scope warning
//   ) {
//     /* Saving user data in localstorage when 
//     logged in and setting up null when logged out */
//     this.afAuth.authState.subscribe((user) => {
//       if (user) {
        
//         this.userData = user;
//         localStorage.setItem('perfil', JSON.stringify(this.userData));
//         JSON.parse(localStorage.getItem('user')!);
        
//       } else {
        
//         localStorage.setItem('user', 'null');
//         JSON.parse(localStorage.getItem('user')!);
        
//       }
//     });
//   }

//   // Sign in with email/password
//   SignIn(email: string, password: string) {
//     return this.afAuth
//       .signInWithEmailAndPassword(email, password)
//       .then((result) => {
//         //this.SetUserData(result.user);
//         this.afAuth.authState.subscribe((user) => {
//           if (user) {
//             console.info(user);
//           }
//         });
//       }).catch((error) => {
//         throw new FirebaseError(error.code, error.message);
//       });
//   }

//   // Sign up with email/password
//   SignUp(f:any, tipo:string) {
//     return this.afAuth
//       .createUserWithEmailAndPassword(f.email, f.pass)
//       .then((result) => {
//         /* Call the SendVerificaitonMail() function when new user sign 
//         up and returns promise */
//         //this.SendVerificationMail(); Sin verificación de e-mail
//         this.SetUserData(result.user, f, tipo);
//       })
//       .catch((error) => {
//         throw new FirebaseError(error.code, error.message);
//       });
//   }

//   // Send email verfificaiton when new user sign up
//   SendVerificationMail() {
//     return this.afAuth.currentUser
//       .then((u: any) => u.sendEmailVerification())
//       .then(() => {
//         this.router.navigate(['verify-email-address']);
//       });
//   }

//   // Reset Forggot password
//   ForgotPassword(passwordResetEmail: string) {
//     return this.afAuth
//       .sendPasswordResetEmail(passwordResetEmail)
//       .then(() => {
//         window.alert('Password reset email sent, check your inbox.');
//       })
//       .catch((error) => {
//         window.alert(error);
//       });
//   }


//   /* Setting up user data when sign in with username/password, 
//   sign up with username/password and sign in with social auth  
//   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
//   SetUserData(user: any, f:any, tipo:string) {
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(
//       `${tipo}/${user.uid}`
//     );
//     //let usuario:any = JSON.parse(localStorage.getItem('user')!);
//     let formObj = f.getRawValue();
//     let objeto = JSON.stringify(formObj)
//     return userRef.set(objeto, {
//       merge: true,
//     });
//   }
//   // Sign out

//   SignOut() {
//     return this.afAuth.signOut().then(() => {
//     });
//   }
  
// }
