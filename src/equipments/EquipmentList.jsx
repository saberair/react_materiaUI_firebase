import React from 'react';
import Cell from './Cell';
import { ListItem, List, Box, Divider } from '@material-ui/core';

export const EquipmentList = ({ equipments }) => {
	return (
		<List>
			<Box width="fit-content">
				{equipments.map((equipment) => (
					<Box mt={1} key={equipment.key}>
						<ListItem button>
							<Cell equipmentKey={equipment.key} equipmentData={equipment.equipmentData} />
						</ListItem>
						<Box pt={1}>
							<Divider />
						</Box>
					</Box>
				))}
			</Box>
		</List>
	);
};
