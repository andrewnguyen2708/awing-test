import { adSchema, campaignschema, subCampaignSchema } from '../helper/schema';

export type AdsType = z.infer<typeof adSchema>;

export type SubCampaignType = z.infer<typeof subCampaignSchema>;

export type CampaignType = z.infer<typeof campaignschema>;

export type ErrorType = {
	[string]?: string;
};

export type CampaignContextType = {
	campaign: CampaignType;
	errors: ErrorType;
	handleChangeCampaignByName: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleChangeCampaignbyCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleAddSubCampaign: () => void;
	handleAddAd: (index: number) => void;
	handleRemoveListAds: (index: number, listIds: string[]) => void;
	handleRemoveAd: (index: number, id: string) => void;
	handleSubmit: () => void;
};
