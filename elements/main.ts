import { enableProdMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { elements } from './app/elements';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

async function init() {
  const app = await platformBrowserDynamic().bootstrapModule(AppModule);
  const injector = app.injector;

  for (const [selector, component] of elements) {
    const element = createCustomElement(component, { injector });
    customElements.define(selector, element);
  }
}

init();