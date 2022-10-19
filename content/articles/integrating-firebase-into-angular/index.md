---
title: Integrating Firebase Into Angular
slug: integrating-firebase-into-angular
headline: Starter template for adding firebase in angular with firebase hosting
hashtags: [angular, firebase]
date: 2021-07-15T23:23:56-04:00
createdAt: Jul 15, 2021
github: https://github.com/panesarpbx8/ngx-firestarter
author: Sukhpreet Singh
authorImage: https://lh3.googleusercontent.com/a-/AOh14Gh75b7CK1JPwLcKqE8a-zJjwaEVGUreGuWl2nYZbw=s96-c
authorLink: https://panesarpbx8.vercel.app
---

## Getting started

We will create this template for getting initial boilerplate code out of the way for the future projects. Let's just get started by creating a new Angular project using its powerful [cli](https://angular.io/cli) tool

```css
$ ng new ngx-firestarter --routing --style=scss
```

## Create firebase project

Create a new firebase project from their [console](https://console.firebase.google.com) and do as follow.

![Creating firebase project](img/firebase.gif)

After creating firebase project, register a new web app and copy the firebase config.

![Creating new web app](img/webapp.gif)

## Installing firebase

Angular provides a awesome schematic for adding firebase into angular projects and setup firebase hosting as well. Upon executing `@angular/fire` schematic, few files will be created or updated. Observe the output below.	

```bash
$ ng add @angular/fire

Would you like to proceed? Yes
UPDATE package.json (1391 bytes)
√ Packages installed successfully.
√ Preparing the list of your Firebase projects
? Please select a project: ngx-firestarter (ngx-firestarter)
CREATE firebase.json (687 bytes)
CREATE .firebaserc (156 bytes)
UPDATE angular.json (3414 bytes)
```

Now, add the firebase config in `environment.ts` and `environment.prod.ts` file

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDoDGm7Em9rKy-1p6BW0UmUrmRbnCNDltI",
    authDomain: "ngx-firestarter.firebaseapp.com",
    projectId: "ngx-firestarter",
    storageBucket: "ngx-firestarter.appspot.com",
    messagingSenderId: "974376732385",
    appId: "1:974376732385:web:2e0a44db995b059037d9a0",
    measurementId: "G-XPVVMYPCFP"
  },
};
```

## Manually install firebase

You can manually install firebase using npm but keep in mind that it won't be adding firebase hosting automatically.

```css
$ npm i @angular/fire firebase
```

## Adding in app.module.ts

import `AngularFireModule` from `@angular/fire` and add it into the imports array. then call the `initialApp` function with the config from `environment.ts` file. I am also gonna import `AngularFirestoreModule` to demonstrate firestore usage in Angular.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Todos module

Generate a todos module mapped to `/todos` route to show the list of todos from the firestore

```bash
$ ng g m todos --route todos -m app

CREATE src/app/todos/todos-routing.module.ts (339 bytes)
CREATE src/app/todos/todos.module.ts (350 bytes)
CREATE src/app/todos/todos.component.html (20 bytes)
CREATE src/app/todos/todos.component.spec.ts (619 bytes)
CREATE src/app/todos/todos.component.ts (272 bytes)
CREATE src/app/todos/todos.component.scss (0 bytes)
UPDATE src/app/app-routing.module.ts (339 bytes)
```

## Using firestore

`AngularFirestore` is a injectable service provided by `@angular/fire` to talk to firestore database. It supports RXJS observables which is already present in Angular.

```ts
'todos.component.ts'

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Todo {
  text: string;
  isDone: boolean;  
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.todos$ = this.firestore.collection<Todo>('todos').valueChanges();
  }

}
```

Using `todos$` in html

```html
<section>
  <h1>Todos</h1>

  <div *ngFor="let todo of (todos$ | async)">
    <h1>{{ todo.text }}</h1>
  </div>
</section>
```

## Deploy to firebase hosting

Run the `deploy` command to build and deploy our Angular app to firebase hosting. now visit your project live at https://ngx-firestarter.web.app

```css
$ ng deploy
```

