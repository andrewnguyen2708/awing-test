import * as React from 'react';
import { Button } from '@mui/material';
import { CampaignContext } from '../../context/campaignContext';

export default function ButtonSubmit() {
	const { handleSubmit } = React.useContext(CampaignContext);
	return (
		<Button variant="contained" onClick={handleSubmit}>
			Lưu chiến dịch
		</Button>
	);
}
