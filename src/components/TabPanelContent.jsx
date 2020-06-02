import React from 'react';
import { Box, Typography } from '@material-ui/core';

const TabPanelContent = ({ fields }) => {
	return (
		<Box ml={4} width={600}>
			{fields &&
				fields.map((field, index) => (
					<Box key={index}>
						<Box display="flex" mt={2}>
							<Box width={200}>
								<Typography>{field.label}: </Typography>
							</Box>
							<Box width={500}>
								<Typography>{field.value}</Typography>
							</Box>
						</Box>
					</Box>
				))}
		</Box>
	);
};

export default TabPanelContent;
