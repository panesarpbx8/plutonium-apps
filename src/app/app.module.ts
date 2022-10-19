import { NgModule } from "@angular/core";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const config = {
  apiKey: "AIzaSyAhtPk6Z8cs3-pODGzi06ntNstJJhUghWo",
  authDomain: "plutonium-dev.firebaseapp.com",
  projectId: "plutonium-dev",
  storageBucket: "plutonium-dev.appspot.com",
  messagingSenderId: "646715865874",
  appId: "1:646715865874:web:74ec7a6ed2672b672a91cb",
  measurementId: "G-93TF1DSJ0T"
};

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
})
export class AppModule {}