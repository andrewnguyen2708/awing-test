import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Card, Checkbox, FormControlLabel, FormGroup, IconButton, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListAds from './ListAds';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { AdsType, ErrorType, SubCampaignType } from '../../@types/campaign';
import { CampaignContext } from '../../context/campaignContext';

export default function ListSubCampaign() {
	const [curSubCampaign, setCurSubCampaign] = React.useState<number>(0);

	const { errors, campaign, handleAddSubCampaign, handleChangeCampaignByName, handleChangeCampaignbyCheckbox } =
		React.useContext(CampaignContext);

	const hasError = React.useMemo(() => {
		const keys = Object.keys(errors);
		for (const item of keys) {
			if (item.includes(`subCampaigns.${curSubCampaign}`)) return true;
		}
		return false;
	}, [errors]);
	
	return (
		<Box
			sx={{
				'& > *': {
					marginTop: 4,
				},
			}}
		>
			<Grid container spacing={2}>
				<Grid>
					<IconButton onClick={handleAddSubCampaign}>
						<AddCircleIcon sx={{ fontSize: 40 }} />
					</IconButton>
				</Grid>
				{campaign.subCampaigns?.map((item: SubCampaignType, index: number) => (
					<Grid xs="auto" key={item.id}>
						<Card
							variant="outlined"
							sx={{ p: 2, minWidth: 210, border: curSubCampaign === index ? '2px solid blue' : null }}
							onClick={() => setCurSubCampaign(index)}
						>
							<Box display="flex" alignItems="center">
								<Typography variant="h6" marginRight={1} color={hasError ? 'error' : 'text'}>
									{item.name}
								</Typography>
								<CheckCircleIcon sx={{ fontSize: 15, color: item.status ? 'green' : 'gray' }} />
							</Box>
							<Typography variant="h4" fontWeight={500} textAlign="center">
								{item?.ads?.reduce((acc: number, cur: AdsType) => acc + cur?.quantity, 0)}
							</Typography>
						</Card>
					</Grid>
				))}
			</Grid>
			<Grid container spacing={4}>
				<Grid xs={12} md={6} lg={3}>
					<TextField
						required
						fullWidth
						variant="standard"
						id="sub-title"
						name={`subCampaigns.${curSubCampaign}.name`}
						label="Tên chiến dịch con"
						value={campaign.subCampaigns[curSubCampaign].name}
						onChange={handleChangeCampaignByName}
						error={errors[`subCampaigns.${curSubCampaign}.name` as keyof ErrorType]}
						helperText={errors[`subCampaigns.${curSubCampaign}.name` as keyof ErrorType]}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={3}>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									name={`subCampaigns.${curSubCampaign}.status`}
									checked={campaign.subCampaigns[curSubCampaign].status}
									onChange={handleChangeCampaignbyCheckbox}
								/>
							}
							label="Đang hoạt động"
						/>
					</FormGroup>
				</Grid>
			</Grid>
			<ListAds curSubCampaign={curSubCampaign} />
		</Box>
	);
}
