import React from 'react';
import { Box, CardMedia, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

const CheckPointCard = ({ checkpoint }) => {
	return (
		<Card>
			<CardActionArea>
				{checkpoint.photo && <CardMedia component="img" image={checkpoint.photo} title="Contemplative Reptile" height={140} />}
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						CheckPoint: {checkpoint.name}
					</Typography>
					{checkpoint.fault && (
						<Box pt={1}>
							<Typography variant="body2" color="textSecondary" component="p">
								Nom du défaut: {checkpoint.fault}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Préconisation: {checkpoint.recommandation}
							</Typography>
						</Box>
					)}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default CheckPointCard;
