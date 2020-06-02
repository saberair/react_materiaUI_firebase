import React from 'react';
import beeldi from '../beeldi.png';
import '../index.css';

const Loader = () => {
	return (
		<div className="Beeldi">
			<header className="Beeldi-header">
				<img src={beeldi} className="Beeldi-logo" alt="logo" />
			</header>
		</div>
	);
};

export default Loader;
