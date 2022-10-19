import { Type } from "@angular/core";
import { LoginFormComponent } from "./login-form/login-form.component";

export const elements: Element[] = [
  ['login-form', LoginFormComponent],
];

type Element = [string, Type<any>];