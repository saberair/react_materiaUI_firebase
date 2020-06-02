export const initialClassicFilterReducerState = {
	fireBaseEquipments: [],
	currentEquipments: [],
};

export const classicFilterReducer = (state = initialClassicFilterReducerState, action) => {
	switch (action.type) {
		case 'POPULATE_EQUIPMENTS':
			const equipments = Object.keys(action.equipments).map((equipmentKey) => {
				return {
					key: equipmentKey,
					equipmentData: action.equipments[equipmentKey],
				};
			});
			return {
				fireBaseEquipments: equipments,
				currentEquipments: equipments,
			};
		case 'SEARCH':
			const currentEquipments = state.fireBaseEquipments.filter((equipment) => {
				const domainMatch = equipment.equipmentData.domain.toLowerCase().includes(action.filter.toLowerCase());
				const nameMatch = equipment.equipmentData.name.toLowerCase().includes(action.filter.toLowerCase());
				return domainMatch || nameMatch;
			});
			return {
				...state,
				currentEquipments,
			};
		default:
			return state;
	}
};
