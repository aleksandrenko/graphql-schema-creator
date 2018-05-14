import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorBoundary from './Components/ErrorBoundary';

import store from './store/';

const Application = (
    <ErrorBoundary>
        <App store={store} />
    </ErrorBoundary>
);

ReactDOM.render(Application, document.getElementById('root'));
