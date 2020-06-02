import React, { useState, useEffect } from 'react';
import { Box, CardMedia, Tabs, Tab } from '@material-ui/core';
import { database } from '../firebase';
import { useParams } from 'react-router-dom';
import TabPanel from '../components/TabPanel';
import TabPanelContent from '../components/TabPanelContent';
import Loader from '../components/Loader';
import CheckPointCard from '../checkpoints/CheckPointCard';

const initialEquipmentState = {
	photo: '',
	name: '',
	domain: '',
	building: '',
	niveau: '',
	local: '',
	status: '',
	nbFaults: '',
};

const EquipmentDetails = () => {
	const [currentEquipment, setCurrentEquipment] = useState(initialEquipmentState);
	const [checkPoints, setCheckPoints] = useState({});
	const [tabValue, setTabValue] = useState(0);
	const [loading, setLoading] = useState(false);
	const { equipmentKey } = useParams();

	useEffect(() => {
		setLoading(true);

		//With this way there is no downside when a user navigates directly to the equipment using the correct Url /equipmentDetails/key
		const currentEquipmentRef = database.ref('Equipments/' + equipmentKey);
		currentEquipmentRef.on('value', (snapshot) => {
			setCurrentEquipment(snapshot.val());

			// get CheckPoints data in the callback of currentEquipmentRef.on() because .on() is not a promise
			// then we can manage loading state to be sure that we get all the data needed before displaying it in the screen
			const checkPointsRef = database.ref('Checkpoints').orderByChild('equipmentKey').equalTo(equipmentKey);
			checkPointsRef.on('value', (snapshot) => {
				setCheckPoints(snapshot.val());
				setLoading(false);
			});
		});
	}, []);

	const handleChange = (event, newTabValue) => {
		event.preventDefault();
		setTabValue(newTabValue);
	};

	return !loading ? (
		<Box display="flex" width="100%">
			<Box width={390} mt={5} ml={2}>
				<CardMedia component="img" image={currentEquipment.photo} height={500} />
			</Box>
			<Box display="flex">
				<Tabs orientation="vertical" indicatorColor="primary" textColor="primary" variant="scrollable" value={tabValue} onChange={handleChange}>
					<Tab label="Information" />
					<Tab label="Caractéristiques" />
					<Tab label="Checkpoints" />
				</Tabs>
				<TabPanel value={tabValue} index={0}>
					<TabPanelContent
						fields={[
							{ label: 'Nom', value: currentEquipment.name },
							{ label: 'Domain', value: currentEquipment.domain },
							{ label: 'Nom du batiment', value: currentEquipment.building },
							{ label: "Niveau ou se situe l'équipement", value: currentEquipment.niveau },
							{ label: "Local ou se situe l'équipement", value: currentEquipment.local },
							{ label: 'Dernier statut constaté', value: currentEquipment.status },
							{ label: 'Nombre de défauts', value: currentEquipment.nbFaults },
						]}
					/>
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
					<TabPanelContent
						fields={[
							{ label: 'Numéro de série', value: currentEquipment.serialNumber },
							{ label: 'Model', value: currentEquipment.model },
							{ label: 'Marque', value: currentEquipment.brand },
							{ label: 'Quantité', value: currentEquipment.quantity },
							{ label: 'Dernier statut constaté', value: currentEquipment.status },
							{ label: 'Prise de notes', value: currentEquipment.notes },
						]}
					/>
				</TabPanel>
				<TabPanel value={tabValue} index={2}>
					<Box width={650} height={500} display="flex" flexWrap="wrap" overflow="auto">
						{Object.keys(checkPoints).map((key) => (
							<CheckPointCard key={key} checkpoint={checkPoints[key]} />
						))}
					</Box>
				</TabPanel>
			</Box>
		</Box>
	) : (
		<Loader />
	);
};

export default EquipmentDetails;
