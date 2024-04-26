import * as React from 'react';
import { set } from '../helper/utils';
import { AdsType, CampaignContextType, CampaignType, ErrorType } from '../@types/campaign';
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

const initialContext = {
	campaign: initialCompaign,
	errors: {},
	handleChangeCampaignByName: () => {},
	handleChangeCampaignbyCheckbox: () => {},
	handleAddSubCampaign: () => {},
	handleAddAd: () => {},
	handleRemoveListAds: () => {},
	handleRemoveAd: () => {},
	handleSubmit: () => {},
};

export const CampaignContext = React.createContext<CampaignContextType>(initialContext);

const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [campaign, setCompaign] = React.useState<CampaignType>(initialCompaign);
	const [errors, setErrors] = React.useState<ErrorType>({});

	const handleChangeCampaignByName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompaign((preCampaign: CampaignType) => {
			const newValue = { ...preCampaign };
			const inputValue = isNaN(parseInt(event.target.value)) ? event.target.value : parseInt(event.target.value);
			setErrors((preError) => {
				const newError = { ...preError };
				delete newError[event.target.name as keyof ErrorType];
				return newError;
			});
			set(newValue, event.target.name, inputValue);
			return newValue;
		});
	};

	const handleChangeCampaignbyCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompaign((preCampaign: CampaignType) => {
			const newValue = { ...preCampaign };

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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const newError: any = {};
			result.error.issues.forEach((item) => {
				const path: string = item.path.join('.');
				newError[path as keyof ErrorType] = item.message;
			});
			setErrors(newError);
			alert('Vui lòng điền đúng và đầy đủ thông tin');
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
