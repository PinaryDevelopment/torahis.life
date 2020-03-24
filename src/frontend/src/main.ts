import Aurelia, { StyleConfiguration, RouterConfiguration } from 'aurelia';
import { App } from './app';
import * as components from './components/index';
import { JitHtmlBrowserConfiguration } from '@aurelia/jit-html-browser';

Aurelia.register(
    JitHtmlBrowserConfiguration,
    StyleConfiguration.cssModulesProcessor(),
    components,
    RouterConfiguration.customize({useUrlFragmentHash: false}),
)
.app(App)
.start();
