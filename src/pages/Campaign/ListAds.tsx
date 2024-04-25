import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { AdsType } from '../../@types/campaign';
import { CampaignContext } from '../../context/campaignContext';

type ListAdsProps = {
	curSubCampaign: number;
};

export default function ListA({ curSubCampaign }: ListAdsProps) {
	const { errors, campaign, handleAddAd, handleRemoveAd, handleRemoveListAds, handleChangeCampaignByName } =
		React.useContext(CampaignContext);

	const listAds = campaign.subCampaigns[curSubCampaign].ads;
	const [listAdsId, setListAdsId] = React.useState<string[]>([]);

	const handleCheck = (id: string) => {
		setListAdsId((preValue: string[]) => {
			let newValue = [...preValue];
			const isCheck = newValue.includes(id);
			if (isCheck) {
				newValue = newValue.filter((item) => item != id);
			} else {
				newValue.push(id);
			}
			return newValue;
		});
	};

	const handleCheckAll = () => {
		if (listAds.length === listAdsId.length) {
			setListAdsId([]);
		} else {
			setListAdsId(listAds.map((item: AdsType) => item.id));
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
				<TableHead>
					<TableRow>
						<TableCell padding="checkbox">
							<Checkbox
								checked={listAds.length === listAdsId.length}
								indeterminate={listAdsId.length > 0 && listAdsId.length < listAds.length}
								onClick={handleCheckAll}
							/>
						</TableCell>
						{listAdsId.length > 0 ? (
							<TableCell colSpan={2}>
								<IconButton
									onClick={() => {
										handleRemoveListAds(curSubCampaign, listAdsId);
										setListAdsId([]);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						) : (
							<>
								<TableCell>Tên quảng cáo*</TableCell>
								<TableCell>Số lượng*</TableCell>
							</>
						)}
						<TableCell align="center" sx={{ width: 60 }}>
							<Button variant="outlined" onClick={() => handleAddAd(curSubCampaign)}>
								<AddIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
								Thêm
							</Button>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{listAds.map((row: AdsType, index: number) => (
						<TableRow hover key={row.id} role="checkbox" sx={{ cursor: 'pointer' }}>
							<TableCell component="th" scope="row" padding="checkbox">
								<Checkbox checked={listAdsId.includes(row.id)} onClick={() => handleCheck(row.id)} />
							</TableCell>
							<TableCell>
								<TextField
									fullWidth
									id={`ads-${index}`}
									name={`subCampaigns.${curSubCampaign}.ads.${index}.name`}
									variant="standard"
									value={listAds[index].name}
									onChange={handleChangeCampaignByName}
									error={errors[`subCampaigns.${curSubCampaign}.ads.${index}.name`]}
									helperText={errors[`subCampaigns.${curSubCampaign}.ads.${index}.name`]}
								/>
							</TableCell>
							<TableCell>
								<TextField
									fullWidth
									id={`number-${index}`}
									name={`subCampaigns.${curSubCampaign}.ads.${index}.quantity`}
									variant="standard"
									type="number"
									inputProps={{ min: 0 }}
									value={listAds[index].quantity}
									onChange={handleChangeCampaignByName}
									error={errors[`subCampaigns.${curSubCampaign}.ads.${index}.quantity`]}
									helperText={errors[`subCampaigns.${curSubCampaign}.ads.${index}.quantity`]}
								/>
							</TableCell>
							<TableCell align="center">
								<IconButton onClick={() => handleRemoveAd(curSubCampaign, row.id)}>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
