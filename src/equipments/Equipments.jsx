import React, { useEffect, useState, useReducer } from 'react';
import { EquipmentList } from './EquipmentList';
import { Box, Typography } from '@material-ui/core';
import { database } from '../firebase';
import { undoTodiFilterReducer, initialUndoTodiFilterReducerState } from '../reducers/undoTodoFilterReducer';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Loader from '../components/Loader';
import { classicFilterReducer, initialClassicFilterReducerState } from '../reducers/classicFilterReducer';

export const Equipments = () => {
	const [equipmentsState, dispatch] =
		process.env.REACT_APP_FILTER_REDUCER === 'UNDO_TODO'
			? useReducer(undoTodiFilterReducer, initialUndoTodiFilterReducerState)
			: useReducer(classicFilterReducer, initialClassicFilterReducerState);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const equipmentsRef = database.ref('Equipments').orderByChild('name');
		equipmentsRef.on('value', (snapshot) => {
			dispatch({ type: 'POPULATE_EQUIPMENTS', equipments: snapshot.val() });
			setLoading(false);
		});
	}, []);

	const onFilterChange = (event) => {
		event.preventDefault();
		dispatch({ type: 'SEARCH', filter: event.target.value });
	};

	return !loading ? (
		<Box textAlign="-webkit-center">
			<Box border={1} m={4} display="flex" width="fit-content">
				<Box>
					<SearchIcon />
				</Box>
				<InputBase placeholder="Search…" onChange={onFilterChange} inputProps={{ 'aria-label': 'search' }} />
			</Box>
			<Box display="flex" textAlign="initial" width="auto">
				<Box width="30%"></Box>
				<Box width="28%">
					<Typography variant="h1" color="primary">
						Nom
					</Typography>
				</Box>
				<Box width="20%">
					<Typography variant="h1" color="primary">
						Domaine
					</Typography>
				</Box>
				<Box width="20%">
					<Typography variant="h1" color="primary">
						Nombre
					</Typography>
				</Box>
			</Box>
			<EquipmentList
				equipments={
					process.env.REACT_APP_FILTER_REDUCER === 'UNDO_TODO' ? equipmentsState.currentEquipments.equipments : equipmentsState.currentEquipments
				}
			/>
		</Box>
	) : (
		<Loader />
	);
};

export default Equipments;
