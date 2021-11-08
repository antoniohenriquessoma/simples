import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';
import HelloWorld from './HelloWorld';


hydrate(<App/>, document.getElementById('root'));