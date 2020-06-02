import React from 'react';
import { Box, CardMedia, Typography } from '@material-ui/core';
import AppLink from '../components/AppLink';

const Cell = ({ equipmentKey, equipmentData }) => {
	return (
		<AppLink to={`equipmentDetails/${equipmentKey}`} color="inherit" underline="none">
			<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
				<Box width={200} textAlign="-webkit-center">
					<Box width={80}>
						<CardMedia component="img" image={equipmentData.photo} height="80" />
					</Box>
				</Box>
				<Box width={400}>
					<Typography variant="body1">{equipmentData.name}</Typography>
				</Box>
				<Box width={300}>
					<Typography variant="body1">{equipmentData.domain}</Typography>
				</Box>
				<Box width={100}>
					<Typography variant="body1">{equipmentData.nbFaults}</Typography>
				</Box>
			</Box>
		</AppLink>
	);
};

export default Cell;
