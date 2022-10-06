import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './app';
import * as serviceWorker from './serviceWorker';
import configureStore, {history} from './configure-store';
import { Provider } from 'react-redux';
import 'typeface-roboto';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>, document.getElementById('root'));

serviceWorker.register();
