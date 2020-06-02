/*
UNDO && REDO algorithm used for filtring for better UI user interaction performance
Explanation with an example:
The main object used is {filter, filtered equipments }

- prevEquipments[] is an array containing a list of objects that is already filtered by the user chronologically 
    example : [{filter 'e', equipments: filtered equipments using the 'e' filter }]
              [{filter 'el', equipments: filtered equipments using the 'el' filter }]

- currentEquipments is an object containing the current filter (written in the searchbar) and the correspond list of equipments
    example {'ele',equipments: filtered equipments using 'ele'}

- futureEquipments[] is an array containig a list of object that is already filtered by the user and deleted
    example [{'elec',equipments: filtered equipments using the 'elec' filter  }]

Here a scenario explaning the issue:
  1)empty search bar => prevEquipments = [];
                        currentEquipments={filter : '', equipments: data from fireBase};
                        futureEquipments=[]     |
                                                |   
                                                |
  2)enter 'e' filter => prevEquipments = [{filter : '', equipments: data from fireBase}] ;
                        currentEquipments=[{filter:'e', filtered equipments}];
                        futureEquipments=[]
  
  3)enter 'el' filter => prevEquipments = [{filter : '', equipments: data from fireBase}, {filter:'e', filtered equipments}] ;
                        currentEquipments= [{filter:'el', filtered equipments}]; 
                        futureEquipments=[]

  4)Now we deleted 'l' (searchbar = 'e') => instead of filtering again,we get the already filtered data from the prevEquipments array
                        prevEquipments = [{filter : '', equipments: data from fireBase}] ;
                        currentEquipments= [{filter:'e', filtered equipments}]; 
                        futureEquipments=[{filter:'el', filtered equipments}]

  5)Now we enter again 'l' (searchbar = 'el') => instead of filtering again, we get already filted data from the futureEquipments array
                        prevEquipments = [{filter : '', equipments: data from fireBase}, {filter:'e', filtered equipments}] ;
                        currentEquipments= [{filter:'el', filtered equipments}]; 
                        futureEquipments=[]
*/

export const initialUndoTodiFilterReducerState = {
	prevEquipment: [],
	currentEquipments: { filter: '', equipments: [] },
	futureEquipment: [],
};

export const undoTodiFilterReducer = (state = initialUndoTodiFilterReducerState, action) => {
	switch (action.type) {
		case 'POPULATE_EQUIPMENTS':
			const equipments = Object.keys(action.equipments).map((equipmentKey) => {
				return {
					key: equipmentKey,
					equipmentData: action.equipments[equipmentKey],
				};
			});
			return {
				prevEquipments: [],
				currentEquipments: { filter: '', equipments },
				futureEquipments: [],
			};
		case 'SEARCH': {
			const filter = action.filter.toLowerCase();
			let prevEquipments = state.prevEquipments;
			let currentEquipments = state.currentEquipments;
			let futureEquipments = state.futureEquipments;
			if (prevEquipments.length > 0 && filter === prevEquipments[prevEquipments.length - 1].filter) {
				if (currentEquipments.equipments.length !== 0) futureEquipments = [currentEquipments, ...futureEquipments];
				currentEquipments = prevEquipments[prevEquipments.length - 1];
				prevEquipments.pop();
			} else if (futureEquipments.length > 0 && filter === futureEquipments[futureEquipments.length - 1].filter) {
				if (currentEquipments.equipments.length !== 0) prevEquipments = [prevEquipments, currentEquipments];
				currentEquipments = futureEquipments[0];
				futureEquipments = futureEquipments.slice(1);
			} else {
				if (currentEquipments.equipments.length !== 0) prevEquipments[prevEquipments.length] = currentEquipments;
				currentEquipments = {
					filter: filter,
					equipments: currentEquipments.equipments.filter((equipment) => {
						const domainMatch = equipment.equipmentData.domain.toLowerCase().includes(filter);
						const nameMatch = equipment.equipmentData.name.toLowerCase().includes(filter);
						return domainMatch || nameMatch;
					}),
				};
			}

			if (prevEquipments.length === 0) {
				futureEquipments = [];
			}

			return {
				...state,
				prevEquipments,
				currentEquipments,
				futureEquipments,
			};
		}
		default:
			return state;
	}
};
