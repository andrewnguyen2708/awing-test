import { z } from 'zod';

export const adSchema = z.object({
	name: z.string().min(1, { message: 'Tên quảng cáo là bắt buộc' }),
	quantity: z.number().gt(0, { message: 'Số lượng quảng cáo là bắt buộc' }),
});

export const subCampaignSchema = z.object({
	name: z.string().min(1, { message: 'Tên chiến dịch con là bắt buộc' }),
	status: z.boolean().optional(),
	ads: z.array(adSchema),
});

export const campaignschema = z.object({
	information: z.object({
		name: z.string().min(1, { message: 'Tên chiến dịch là bắt buộc' }),
		describe: z.string().optional(),
	}),
	subCampaigns: z.array(subCampaignSchema),
});
