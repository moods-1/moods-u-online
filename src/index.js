import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<SnackbarProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</SnackbarProvider>
	</React.StrictMode>
);
