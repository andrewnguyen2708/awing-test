import * as React from 'react';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { CampaignContext } from '../../context/campaignContext';

export default function CampaignInfo() {
	const { errors, campaign, handleChangeCampaignByName } = React.useContext(CampaignContext);
	return (
		<Grid container spacing={4}>
			<Grid xs={12} md={6} lg={3}>
				<TextField
					id="name"
					name="information.name"
					required
					fullWidth
					label="Tên chiến dịch"
					variant="standard"
					value={campaign.information.name}
					onChange={handleChangeCampaignByName}
					error={errors['information.name']}
					helperText={errors['information.name']}
				/>
			</Grid>
			<Grid xs={12} md={6} lg={6}>
				<TextField
					id="describe"
					label="Mô tả"
					fullWidth
					variant="standard"
					value={campaign.information.describe}
					name="information.describe"
					onChange={handleChangeCampaignByName}
				/>
			</Grid>
		</Grid>
	);
}
