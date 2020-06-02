import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const AppLink = ({ to, children, color, underline }) => {
	return (
		<Link component={RouterLink} to={to || '#'} color={color} underline={underline}>
			{children}
		</Link>
	);
};

export default AppLink;
