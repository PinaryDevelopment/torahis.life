import Aurelia, { RouterConfiguration, cssModules } from 'aurelia';
import { App } from './app';
import * as components from './components/index';
import { JitHtmlBrowserConfiguration } from '@aurelia/jit-html-browser';

Aurelia.register(
    JitHtmlBrowserConfiguration,
    cssModules(),
    components,
    RouterConfiguration.customize(),
)
.app(App)
.start();
