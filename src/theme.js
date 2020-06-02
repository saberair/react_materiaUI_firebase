import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	typography: {
		h1: {
			fontFamily: 'ScandiaWebMedium',
			fontSize: '1.5rem',
			lineHeight: '160%',
		},
		body1: {
			fontFamily: 'ScandiaWebRegular',
			fontSize: '0.875rem',
			lineHeight: '180%',
		},
	},
	overrides: {
		MuiCard: {
			root: {
				maxWidth: '200px',
				margin: '5px',
			},
		},
		MuiTabs: {
			root: {
				borderRight: `1px solid`,
				marginTop: '200px',
				height: '150px',
			},
		},
	},
});
