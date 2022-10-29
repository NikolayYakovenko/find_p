import 'babel-polyfill';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);

root.render(<App />);
