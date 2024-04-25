import * as React from 'react';
import { set } from '../helper/utils';
import { AdsType, CampaignContextType, CampaignType, errorType } from '../@types/campaign';
import { nanoid } from 'nanoid';
import { campaignschema } from '../helper/schema';

const generateAd = (number: number = 1) => {
	return {
		id: nanoid(),
		name: `Quảng cáo ${number}`,
		quantity: 0,
	};
};

const generateSubCampaign = (number: number = 1) => {
	return {
		id: nanoid(),
		name: `Chiến dịch con ${number}`,
		status: true,
		ads: [generateAd()],
	};
};

const initialCompaign: CampaignType = {
	information: {
		name: '',
		describe: '',
	},
	subCampaigns: [generateSubCampaign()],
};

export const CampaignContext = React.createContext<CampaignContextType>(null);

const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [campaign, setCompaign] = React.useState<CampaignType>(initialCompaign);
	const [errors, setErrors] = React.useState<errorType>({});

	const handleChangeCampaignByName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompaign((preCampaign: CampaignType) => {
			const newValue = { ...preCampaign };
			const inputValue = isNaN(parseInt(event.target.value)) ? event.target.value : parseInt(event.target.value);
			setErrors((preError) => {
				const newError = { ...preError };
				delete newError[event.target.name];
				return newError;
			});
			set(newValue, event.target.name, inputValue);
			return newValue;
		});
	};

	const handleChangeCampaignbyCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompaign((preCampaign: CampaignType) => {
			const newValue = { ...preCampaign };

			console.log({ Checked: event.target.checked });

			set(newValue, event.target.name, event.target.checked);
			console.log({ newValue });
			return newValue;
		});
	};

	const handleAddSubCampaign = () => {
		setCompaign((preCampaign: CampaignType) => {
			const newValue = { ...preCampaign };
			newValue.subCampaigns.push(generateSubCampaign(newValue.subCampaigns.length + 1));
			return newValue;
		});
	};

	const handleAddAd = (subCampaignsIndex: number) => {
		setCompaign((preCampaign: CampaignType) => {
			const newValue = { ...preCampaign };
			newValue.subCampaigns[subCampaignsIndex].ads.push(
				generateAd(newValue.subCampaigns[subCampaignsIndex].ads.length + 1)
			);
			return newValue;
		});
	};

	const handleRemoveAd = (subCampaignsIndex: number, adId: string) => {
		setCompaign((preCampaign: CampaignType) => {
			const newValue = { ...preCampaign };
			newValue.subCampaigns[subCampaignsIndex].ads = newValue.subCampaigns[subCampaignsIndex].ads.filter(
				(item: AdsType) => item.id != adId
			);
			return newValue;
		});
	};

	const handleRemoveListAds = (subCampaignsIndex: number, listAdsId: string[]) => {
		setCompaign((preCampaign: CampaignType) => {
			const newValue = { ...preCampaign };
			newValue.subCampaigns[subCampaignsIndex].ads = newValue.subCampaigns[subCampaignsIndex].ads.filter(
				(item: AdsType) => !listAdsId.includes(item.id)
			);
			return newValue;
		});
	};

	const handleSubmit = () => {
		const result = campaignschema.safeParse(campaign);
		if (result.success) {
			alert('Thêm chiến dịch thành công \n' + JSON.stringify({ campaign: result.data }));
		} else {
			const newError = {};
			result.error.issues.forEach((item) => {
				const path = item.path.join('.');
				newError[path] = item.message;
			});
			setErrors(newError);
		}
	};

	return (
		<CampaignContext.Provider
			value={{
				campaign,
				errors,
				handleChangeCampaignByName,
				handleAddSubCampaign,
				handleAddAd,
				handleRemoveAd,
				handleRemoveListAds,
				handleChangeCampaignbyCheckbox,
				handleSubmit,
			}}
		>
			{children}
		</CampaignContext.Provider>
	);
};

export default CampaignProvider;
