import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import store from "./redux/store";

ReactDOM.render(
    <Provider store={store}>

        <StrictMode>
            <ColorModeScript />
            <App />
        </StrictMode>
    </Provider>
    ,
  document.getElementById('root')
);

