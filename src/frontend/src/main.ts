import Aurelia from 'aurelia';
import { MyApp } from './my-app';
// import * as globalComponents from './registry';

Aurelia
    // .register(globalComponents)
    .app(MyApp)
    .start();
