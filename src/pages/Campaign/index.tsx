import * as React from 'react';
import CustomTabPanel from '../../components/CustomTabPanel';
import { a11yProps } from '../../helper/utils';
import ListSubCampaign from './ListSubCampaign';
import { Box, Card, Divider, Tab, Tabs } from '@mui/material';
import CampaignProvider from '../../context/campaignContext';
import CampaignInfo from './CampaignInfo';
import ButtonSubmit from './ButtonSubmit';

export default function Campaign() {
	const [tabIndex, setTabIndex] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	};

	return (
		<CampaignProvider>
			<Box p={4}>
				<Box mb={4} display="flex" justifyContent="flex-end">
					<ButtonSubmit />
				</Box>
				<Divider />
				<Card>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={tabIndex} onChange={handleChange} aria-label="tabs campaign">
								<Tab label="Thông tin" {...a11yProps(0)} />
								<Tab label="Chiến dịch con" {...a11yProps(1)} />
							</Tabs>
						</Box>
						<CustomTabPanel value={tabIndex} index={0}>
							<CampaignInfo />
						</CustomTabPanel>
						<CustomTabPanel value={tabIndex} index={1}>
							<ListSubCampaign />
						</CustomTabPanel>
					</Box>
				</Card>
			</Box>
		</CampaignProvider>
	);
}
