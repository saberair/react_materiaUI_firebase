import React from 'react';
import AppRouter from './routers/AppRouter';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core/styles';

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<AppRouter />
		</ThemeProvider>
	);
};

export default App;
