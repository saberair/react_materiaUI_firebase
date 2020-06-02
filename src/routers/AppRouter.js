import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Equipments } from './../equipments/Equipments';
import NotFound from '../components/NotFound';
import EquipmentDetails from './../equipments/EquipmentDetails';

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Switch>
				<Route path="/" component={Equipments} exact={true} />
				<Route path="/equipmentDetails/:equipmentKey" component={EquipmentDetails} />
				<Route component={NotFound} />,
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;
